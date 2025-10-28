import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../../shared/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { EmailService } from '../email/email.service'
import { RedisService } from '../../shared/services/redis.service'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private redisService: RedisService
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto

    // Verifica se o email já existe
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUserByEmail) {
      throw new ConflictException('Email já está em uso')
    }

    // Verifica se o nome já existe
    const existingUserByName = await this.prisma.user.findUnique({
      where: { name },
    })

    if (existingUserByName) {
      throw new ConflictException('Nome de usuário já está em uso')
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o usuário
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    // Gera os tokens JWT
    const tokens = await this.generateTokens(user.id, user.email)

    // Envia email de boas-vindas (não bloqueia o registro se falhar)
    try {
      await this.emailService.sendWelcomeEmail({
        to: user.email,
        userName: user.name,
      })
    } catch (error) {
      // Log erro mas não interrompe o registro
      this.logger.error('Failed to send welcome email:', error)
    }

    return {
      user,
      ...tokens,
    }
  }

  async login(loginDto: LoginDto) {
    const { identifier, password } = loginDto

    // Verifica se é email ou nome de usuário
    const isEmail = identifier.includes('@')

    // Busca o usuário por email ou nome
    const user = await this.prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { name: identifier },
    })

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    // Gera os tokens JWT
    const tokens = await this.generateTokens(user.id, user.email)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...tokens,
    }
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return user
  }

  async refreshTokens(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException('Acesso negado')
    }

    // Gera novos tokens
    const tokens = await this.generateTokens(user.id, user.email)

    return tokens
  }

  async logout() {
    // Logout é stateless - o frontend deve descartar os tokens
    return { message: 'Logout realizado com sucesso' }
  }

  async forgotPassword(identifier: string) {
    // Verifica se é email ou nome de usuário
    const isEmail = identifier.includes('@')

    // Busca o usuário
    const user = await this.prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { name: identifier },
    })

    if (!user) {
      throw new UnauthorizedException('Email ou nome de usuário não encontrado')
    }

    // Gera token JWT para reset de senha (expira em 1 hora)
    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, type: 'password_reset' },
      {
        expiresIn: '1h',
      }
    )

    // Cria o link de reset
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`

    // Envia email
    try {
      await this.emailService.sendPasswordResetEmail({
        to: user.email,
        userName: user.name,
        resetLink,
      })
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error)
      // Não falha a operação se o email não for enviado
    }

    return {
      message: 'Um link de recuperação foi enviado para seu email.',
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password, confirmPassword } = resetPasswordDto

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      throw new ConflictException('As senhas não coincidem')
    }

    // Verifica se o token está na blacklist (já foi usado)
    const blacklistKey = `password_reset_blacklist:${token}`
    try {
      const isTokenUsed = await this.redisService.exists(blacklistKey)

      if (isTokenUsed) {
        throw new UnauthorizedException(
          'Este magic link já foi utilizado. Solicite uma nova recuperação de senha.'
        )
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      this.logger.error('Erro ao verificar blacklist:', error)

      // Continua mesmo se houver erro no Redis
    }

    // Validação rigorosa do token JWT
    let payload: any
    try {
      // verifyAsync já valida:
      // - Assinatura do token (se foi modificado, falha)
      // - Expiração do token
      // - Formato do token
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
    } catch (error: any) {
      // Erro específico para token malformado ou com assinatura inválida
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token com assinatura inválida')
      }
      // Erro específico para token expirado
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado')
      }
      // Outros erros
      throw new UnauthorizedException('Token inválido ou expirado')
    }

    // Verifica se é um token de reset de senha
    if (!payload.type || payload.type !== 'password_reset') {
      throw new UnauthorizedException('Token inválido - tipo incorreto')
    }

    // Verifica se tem o userId
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido - dados incompletos')
    }

    const userId = payload.sub

    // Busca o usuário
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Atualiza a senha
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    // Marca o token como usado na blacklist (para impedir reutilização)
    try {
      await this.redisService.set(blacklistKey, 'used', 70 * 60) // 70 minutos = 1h 10min
      this.logger.log(`Token marcado como usado na blacklist: ${blacklistKey}`)
    } catch (error) {
      this.logger.error('Erro ao marcar token como usado:', error)
    }

    // Envia email de confirmação
    try {
      await this.emailService.sendPasswordChangedEmail({
        to: user.email,
        userName: user.name,
      })
    } catch (error) {
      this.logger.error(
        'Failed to send password changed confirmation email:',
        error
      )
      // Não falha a operação se o email não for enviado
    }

    return { message: 'Senha redefinida com sucesso' }
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m', // Access token expira em 15 minutos
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d', // Refresh token expira em 7 dias
      }),
    ])

    return {
      access_token,
      refresh_token,
    }
  }
}
