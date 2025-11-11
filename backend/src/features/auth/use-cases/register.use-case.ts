import {
  Injectable,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from '../../../shared/repositories/user.repository'
import { RegisterDto } from '../dto/register.dto'
import { EmailService } from '../../email/email.service'
import { TokenService } from '../services/token.service'

@Injectable()
export class RegisterUseCase {
  private readonly logger = new Logger(RegisterUseCase.name)

  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private emailService: EmailService
  ) {}

  async execute(registerDto: RegisterDto) {
    const { email, name, password } = registerDto

    // Verifica se o email já existe
    const existingUserByEmail = await this.userRepository.findByEmail(email)
    if (existingUserByEmail) {
      throw new ConflictException('Email já está em uso')
    }

    // Verifica se o nome já existe
    const existingUserByName = await this.userRepository.findByName(name)
    if (existingUserByName) {
      throw new ConflictException('Nome de usuário já está em uso')
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o usuário
    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    })

    // Gera os tokens JWT
    const tokens = await this.tokenService.generateTokens(user.id, user.email)

    // Envia email de boas-vindas (não bloqueia o registro se falhar)
    try {
      await this.emailService.sendWelcomeEmail({
        to: user.email,
        userName: user.name,
      })
    } catch (error) {
      this.logger.error('Failed to send welcome email:', error)
    }

    return {
      user,
      ...tokens,
    }
  }
}

