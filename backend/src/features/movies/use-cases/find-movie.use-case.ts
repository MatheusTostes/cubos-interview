import { Injectable, NotFoundException } from '@nestjs/common'
import { MovieRepository } from '../../../shared/repositories/movie.repository'

@Injectable()
export class FindMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string) {
    const movie = await this.movieRepository.findOne(id)

    if (!movie) {
      throw new NotFoundException('Filme não encontrado')
    }

    return movie
  }
}

