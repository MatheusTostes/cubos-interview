import { Injectable, NotFoundException } from '@nestjs/common'
import { MovieRepository } from '../../../shared/repositories/movie.repository'
import { UpdateMovieDto } from '../dto/update-movie.dto'
import { MovieUploadService } from '../services/movie-upload.service'
import { MovieNotificationService } from '../services/movie-notification.service'
import { MovieDataMapper } from '../mappers/movie-data.mapper'

@Injectable()
export class UpdateMovieUseCase {
  constructor(
    private movieRepository: MovieRepository,
    private movieUploadService: MovieUploadService,
    private movieNotificationService: MovieNotificationService
  ) {}

  async execute(
    id: string,
    updateMovieDto: UpdateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    // Verifica se o filme existe
    const existingMovie = await this.movieRepository.findOne(id)
    if (!existingMovie) {
      throw new NotFoundException('Filme não encontrado')
    }

    // Processa upload de imagens se houver
    const imageUrls = await this.movieUploadService.processImagesForUpdate(
      existingMovie,
      updateMovieDto,
      files
    )

    // Mapeia dados para atualização
    const updateData = MovieDataMapper.toUpdateData(updateMovieDto, imageUrls)

    // Atualiza o filme
    const updatedMovie = await this.movieRepository.update(id, updateData)

    // Atualiza notificação se data foi alterada
    if (updateMovieDto.releaseDate) {
      await this.movieNotificationService.updateSchedule(id, updatedMovie)
    }

    return updatedMovie
  }
}

