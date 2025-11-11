import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from '../../../shared/repositories/user.repository'
import { ResetPasswordDto } from '../dto/reset-password.dto'
import { EmailService } from '../../email/email.service'
import { RedisService } from '../../../shared/services/redis.service'
import { PasswordResetTokenService } from '../services/password-reset-token.service'

@Injectable()
export class ResetPasswordUseCase {
  private readonly logger = new Logger(ResetPasswordUseCase.name)

  constructor(
    private userRepository: UserRepository,
    private passwordResetTokenService: PasswordResetTokenService,
    private emailService: EmailService,
    private redisService: RedisService
  ) {}

  async execute(resetPasswordDto: ResetPasswordDto) {
    const { token, password, confirmPassword } = resetPasswordDto

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      throw new ConflictException('As senhas não coincidem')
    }

    // Verifica se o token está na blacklist
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
    }

    // Valida o token
    const userId = await this.passwordResetTokenService.validateToken(token)

    // Busca o usuário
    const user = await this.userRepository.findUnique(userId)
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Atualiza a senha
    await this.userRepository.update(userId, { password: hashedPassword })

    // Marca o token como usado na blacklist
    try {
      await this.redisService.set(blacklistKey, 'used', 70 * 60)
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
    }

    return { message: 'Senha redefinida com sucesso' }
  }
}

