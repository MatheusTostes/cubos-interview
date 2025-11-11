import { Injectable, NotFoundException } from '@nestjs/common'
import { MovieRepository } from '../../../shared/repositories/movie.repository'
import { MovieNotificationService } from '../services/movie-notification.service'

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    private movieRepository: MovieRepository,
    private movieNotificationService: MovieNotificationService
  ) {}

  async execute(id: string) {
    const movie = await this.movieRepository.findOne(id)
    if (!movie) {
      throw new NotFoundException('Filme não encontrado')
    }

    await this.movieNotificationService.removeSchedule(id)

    return this.movieRepository.delete(id)
  }
}
