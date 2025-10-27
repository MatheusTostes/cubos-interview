import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SituationsService } from './situations.service'

@ApiTags('Situações')
@Controller('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as situações' })
  @ApiResponse({ status: 200, description: 'Lista de situações' })
  findAll() {
    return this.situationsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter situação por ID' })
  @ApiResponse({ status: 200, description: 'Situação encontrada' })
  @ApiResponse({ status: 404, description: 'Situação não encontrada' })
  findOne(@Param('id') id: string) {
    return this.situationsService.findOne(id)
  }
}
