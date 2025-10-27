import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../../shared/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
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
