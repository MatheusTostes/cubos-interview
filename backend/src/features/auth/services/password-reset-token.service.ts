import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class PasswordResetTokenService {
  constructor(private jwtService: JwtService) {}

  async generateResetLink(userId: string): Promise<{
    resetToken: string
    resetLink: string
  }> {
    const resetToken = await this.jwtService.signAsync(
      { sub: userId, type: 'password_reset' },
      {
        expiresIn: '1h',
      }
    )

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`

    return { resetToken, resetLink }
  }

  async validateToken(token: string): Promise<string> {
    let payload: any
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token com assinatura inválida')
      }
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado')
      }
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

    return payload.sub
  }
}

