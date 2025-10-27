import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GenresService } from './genres.service'

@ApiTags('Gêneros')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os gêneros' })
  @ApiResponse({ status: 200, description: 'Lista de gêneros' })
  findAll() {
    return this.genresService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um gênero por ID' })
  @ApiResponse({ status: 200, description: 'Gênero encontrado' })
  @ApiResponse({ status: 404, description: 'Gênero não encontrado' })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id)
  }
}
