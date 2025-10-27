import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger'
import { MoviesService } from './movies.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard'

@ApiTags('Filmes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo filme' })
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os filmes' })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'genres', required: false, type: [String] })
  @ApiQuery({ name: 'classifications', required: false, type: [String] })
  @ApiQuery({ name: 'situations', required: false, type: [String] })
  @ApiResponse({ status: 200, description: 'Lista de filmes' })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
    @Query('genres') genres?: string | string[],
    @Query('classifications') classifications?: string | string[],
    @Query('situations') situations?: string | string[]
  ) {
    return this.moviesService.findAll({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 10,
      search,
      genres: Array.isArray(genres) ? genres : genres ? [genres] : undefined,
      classifications: Array.isArray(classifications)
        ? classifications
        : classifications
          ? [classifications]
          : undefined,
      situations: Array.isArray(situations)
        ? situations
        : situations
          ? [situations]
          : undefined,
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um filme por ID' })
  @ApiResponse({ status: 200, description: 'Filme encontrado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um filme' })
  @ApiResponse({ status: 200, description: 'Filme atualizado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um filme' })
  @ApiResponse({ status: 200, description: 'Filme deletado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id)
  }
}
