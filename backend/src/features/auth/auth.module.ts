import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { EmailModule } from '../email/email.module'
import { RedisModule } from '../../shared/services/redis.module'
import { RepositoriesModule } from '../../shared/repositories/repositories.module'
import { RegisterUseCase } from './use-cases/register.use-case'
import { LoginUseCase } from './use-cases/login.use-case'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.use-case'
import { ResetPasswordUseCase } from './use-cases/reset-password.use-case'
import { TokenService } from './services/token.service'
import { PasswordResetTokenService } from './services/password-reset-token.service'

@Module({
  imports: [
    PassportModule,
    EmailModule,
    RedisModule,
    RepositoriesModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your-secret-key',
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RegisterUseCase,
    LoginUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    TokenService,
    PasswordResetTokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
