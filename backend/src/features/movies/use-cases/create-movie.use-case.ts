import { Injectable } from '@nestjs/common'
import { MovieRepository } from '../../../shared/repositories/movie.repository'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { MovieUploadService } from '../services/movie-upload.service'
import { MovieNotificationService } from '../services/movie-notification.service'
import { MovieDataMapper } from '../mappers/movie-data.mapper'

@Injectable()
export class CreateMovieUseCase {
  constructor(
    private movieRepository: MovieRepository,
    private movieUploadService: MovieUploadService,
    private movieNotificationService: MovieNotificationService
  ) {}

  async execute(
    createMovieDto: CreateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    // Processa upload de imagens
    const imageUrls = await this.movieUploadService.processImages(
      createMovieDto,
      files
    )

    // Mapeia dados para o formato do repository
    const movieData = MovieDataMapper.toCreateData(createMovieDto, imageUrls)

    // Cria o filme
    const movie = await this.movieRepository.create(movieData)

    // Agenda notificação se necessário
    await this.movieNotificationService.scheduleIfFuture(movie)

    return movie
  }
}

