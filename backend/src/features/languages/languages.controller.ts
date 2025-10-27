import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { LanguagesService } from './languages.service'

@ApiTags('Idiomas')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os idiomas' })
  @ApiResponse({ status: 200, description: 'Lista de idiomas' })
  findAll() {
    return this.languagesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um idioma por ID' })
  @ApiResponse({ status: 200, description: 'Idioma encontrado' })
  @ApiResponse({ status: 404, description: 'Idioma não encontrado' })
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(id)
  }
}
