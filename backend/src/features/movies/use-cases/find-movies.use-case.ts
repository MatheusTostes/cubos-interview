import { Injectable } from '@nestjs/common'
import { MovieRepository } from '../../../shared/repositories/movie.repository'
import { MovieFiltersHelper } from '../helpers/movie-filters.helper'

export interface FindMoviesOptions {
  skip?: number
  take?: number
  search?: string
  genres?: string[]
  classifications?: string[]
  situations?: string[]
  durationMin?: number
  durationMax?: number
  releaseDateStart?: string
  releaseDateEnd?: string
}

@Injectable()
export class FindMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(options: FindMoviesOptions = {}) {
    const {
      skip = 0,
      take = 10,
      search,
      genres,
      classifications,
      situations,
      durationMin,
      durationMax,
      releaseDateStart,
      releaseDateEnd,
    } = options

    // Construir filtros
    const where = MovieFiltersHelper.buildWhereClause({
      search,
      genres,
      classifications,
      situations,
      durationMin,
      durationMax,
      releaseDateStart,
      releaseDateEnd,
    })

    // Buscar filmes
    return this.movieRepository.findMany({
      skip,
      take,
      where,
    })
  }
}

