import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from '../../../shared/repositories/user.repository'
import { LoginDto } from '../dto/login.dto'
import { TokenService } from '../services/token.service'

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  async execute(loginDto: LoginDto) {
    const { identifier, password } = loginDto

    const user = await this.userRepository.findByEmailOrName(identifier)
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const tokens = await this.tokenService.generateTokens(user.id, user.email)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...tokens,
    }
  }
}

