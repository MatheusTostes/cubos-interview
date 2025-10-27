import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { EmailService } from './email.service'

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  @ApiOperation({ summary: 'Testar envio de email' })
  @ApiResponse({ status: 200, description: 'Email enviado' })
  async testEmail(@Body() data: { to: string }) {
    return this.emailService.sendMovieReleaseNotification({
      to: data.to,
      movieTitle: 'Teste',
      releaseDate: new Date().toISOString(),
      userName: 'Usuário Teste',
    })
  }
}
