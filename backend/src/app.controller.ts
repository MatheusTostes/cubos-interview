import { Controller, Get, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { AppService } from './app.service'
import { Public } from './shared/decorators/public.decorator'
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'
import { CurrentUser } from './shared/decorators/current-user.decorator'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check (público)' })
  @ApiResponse({ status: 200, description: 'API está funcionando' })
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Rota protegida - teste de autenticação' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado',
    schema: {
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProtected(@CurrentUser() user: { id: string; email: string }) {
    return {
      message: 'Você está autenticado!',
      user: {
        id: user.id,
        email: user.email,
      },
    }
  }
}
