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
  UseInterceptors,
  UploadedFiles,
  Request,
  ForbiddenException,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger'
import { MoviesService } from './movies.service'
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard'

@ApiTags('Filmes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 2))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Criar um novo filme' })
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
    @Request() req: any
  ) {
    // Converter arrays stringificados de volta para arrays
    const createMovieDto = {
      ...body,
      genreIds: JSON.parse(body.genreIds || '[]'),
      languageId: body.languageId,
      budget: parseFloat(body.budget),
      revenue: parseFloat(body.revenue),
      runtimeSeconds: parseInt(body.runtimeSeconds),
      aggregateRating: parseFloat(body.aggregateRating),
      voteCount: parseInt(body.voteCount),
      userId: req.user.id, // Adiciona o userId do usuário logado
    }

    return this.moviesService.create(createMovieDto, files)
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os filmes' })
  @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'genres', required: false, type: [String] })
  @ApiQuery({ name: 'classifications', required: false, type: [String] })
  @ApiQuery({ name: 'situations', required: false, type: [String] })
  @ApiQuery({ name: 'durationMin', required: false, type: Number })
  @ApiQuery({ name: 'durationMax', required: false, type: Number })
  @ApiQuery({ name: 'releaseDateStart', required: false, type: String })
  @ApiQuery({ name: 'releaseDateEnd', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de filmes' })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
    @Query('genres') genres?: string | string[],
    @Query('classifications') classifications?: string | string[],
    @Query('situations') situations?: string | string[],
    @Query('durationMin') durationMin?: string,
    @Query('durationMax') durationMax?: string,
    @Query('releaseDateStart') releaseDateStart?: string,
    @Query('releaseDateEnd') releaseDateEnd?: string
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
      durationMin: durationMin ? parseInt(durationMin) : undefined,
      durationMax: durationMax ? parseInt(durationMax) : undefined,
      releaseDateStart,
      releaseDateEnd,
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
  @UseInterceptors(FilesInterceptor('images', 2))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Atualizar um filme' })
  @ApiResponse({ status: 200, description: 'Filme atualizado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para editar este filme',
  })
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
    @Request() req: any
  ) {
    // Verifica se o usuário é o dono do filme
    const movie = await this.moviesService.findOne(id)
    if ((movie as any).userId !== req.user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este filme'
      )
    }

    // Converter arrays stringificados de volta para arrays
    const updateMovieDto = {
      ...body,
      genreIds: JSON.parse(body.genreIds || '[]'),
      languageId: body.languageId,
      budget: body.budget ? parseFloat(body.budget) : undefined,
      revenue: body.revenue ? parseFloat(body.revenue) : undefined,
      runtimeSeconds: body.runtimeSeconds
        ? parseInt(body.runtimeSeconds)
        : undefined,
      aggregateRating: body.aggregateRating
        ? parseFloat(body.aggregateRating)
        : undefined,
      voteCount: body.voteCount ? parseInt(body.voteCount) : undefined,
    }

    return this.moviesService.update(id, updateMovieDto, files)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um filme' })
  @ApiResponse({ status: 200, description: 'Filme deletado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para deletar este filme',
  })
  async remove(@Param('id') id: string, @Request() req: any) {
    // Verifica se o usuário é o dono do filme
    const movie = await this.moviesService.findOne(id)
    if ((movie as any).userId !== req.user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar este filme'
      )
    }

    return this.moviesService.remove(id)
  }

  @Post(':id/test-notification')
  @ApiOperation({ summary: 'Testar envio de notificação (DEV ONLY)' })
  @ApiResponse({ status: 200, description: 'Notificação enviada' })
  async testNotification(@Param('id') id: string) {
    return this.moviesService.testNotification(id)
  }
}
