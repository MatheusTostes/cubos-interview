import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ClassificationsService } from './classifications.service'

@ApiTags('Classificações')
@Controller('classifications')
export class ClassificationsController {
  constructor(
    private readonly classificationsService: ClassificationsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as classificações' })
  @ApiResponse({ status: 200, description: 'Lista de classificações' })
  findAll() {
    return this.classificationsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma classificação por ID' })
  @ApiResponse({ status: 200, description: 'Classificação encontrada' })
  @ApiResponse({ status: 404, description: 'Classificação não encontrada' })
  findOne(@Param('id') id: string) {
    return this.classificationsService.findOne(id)
  }
}
