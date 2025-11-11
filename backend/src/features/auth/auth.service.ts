import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from '../../shared/repositories/user.repository'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { RegisterUseCase } from './use-cases/register.use-case'
import { LoginUseCase } from './use-cases/login.use-case'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.use-case'
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case'
import { TokenService } from './services/token.service'

@Injectable()
export class AuthService {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  async register(registerDto: RegisterDto) {
    return this.registerUseCase.execute(registerDto)
  }

  async login(loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto)
  }

  async validateUser(userId: string) {
    return this.userRepository.findUnique(userId, {
      id: true,
      email: true,
      name: true,
    })
  }

  async refreshTokens(userId: string) {
    const user = await this.userRepository.findUnique(userId, {
      id: true,
      email: true,
    })

    if (!user) {
      throw new UnauthorizedException('Acesso negado')
    }

    return this.tokenService.generateTokens(user.id, user.email)
  }

  async logout() {
    return { message: 'Logout realizado com sucesso' }
  }

  async forgotPassword(identifier: string) {
    return this.forgotPasswordUseCase.execute(identifier)
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(resetPasswordDto)
  }
}
