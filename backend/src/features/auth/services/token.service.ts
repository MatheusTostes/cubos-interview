import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ])

    return {
      access_token,
      refresh_token,
    }
  }
}

