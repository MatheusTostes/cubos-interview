import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { UserRepository } from '../../../shared/repositories/user.repository'
import { EmailService } from '../../email/email.service'
import { PasswordResetTokenService } from '../services/password-reset-token.service'

@Injectable()
export class ForgotPasswordUseCase {
  private readonly logger = new Logger(ForgotPasswordUseCase.name)

  constructor(
    private userRepository: UserRepository,
    private passwordResetTokenService: PasswordResetTokenService,
    private emailService: EmailService
  ) {}

  async execute(identifier: string) {
    const user = await this.userRepository.findByEmailOrName(identifier)
    if (!user) {
      throw new UnauthorizedException('Email ou nome de usuário não encontrado')
    }

    const { resetToken, resetLink } =
      await this.passwordResetTokenService.generateResetLink(user.id)

    try {
      await this.emailService.sendPasswordResetEmail({
        to: user.email,
        userName: user.name,
        resetLink,
      })
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error)
    }

    return {
      message: 'Um link de recuperação foi enviado para seu email.',
    }
  }
}

