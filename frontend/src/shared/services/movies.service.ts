import { api } from './api'

export interface MoviesListParams {
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

export interface MoviesListResponse {
  data: MovieFromAPI[]
  total: number
  skip: number
  take: number
}

export interface MovieFromAPI {
  id: string
  primaryTitle: string
  originalTitle: string
  primaryImageUrl: string
  secondaryImageUrl: string
  plot: string
  subTitle: string
  releaseDate: string
  runtimeSeconds: number
  trailerUrl: string
  budget: number
  revenue: number
  profit: number
  aggregateRating: number
  voteCount: number
  classificationId: string
  situationId: string
  userId: string
  createdAt: string
  updatedAt: string
  genres: {
    genre: {
      id: string
      name: string
    }
  }[]
  language: {
    id: string
    code: string
    name: string
  }
  classification: {
    id: string
    name: string
    age: number
  }
  situation: {
    id: string
    name: string
  }
  owner?: {
    id: string
    name: string
    email: string
  }
}

export const moviesService = {
  async getMovies(params: MoviesListParams = {}): Promise<MoviesListResponse> {
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
    } = params

    const queryParams = new URLSearchParams()
    queryParams.append('skip', skip.toString())
    queryParams.append('take', take.toString())

    if (search) {
      queryParams.append('search', search)
    }

    if (genres && genres.length > 0) {
      genres.forEach((genre) => queryParams.append('genres', genre))
    }

    if (classifications && classifications.length > 0) {
      classifications.forEach((classification) =>
        queryParams.append('classifications', classification)
      )
    }

    if (situations && situations.length > 0) {
      situations.forEach((situation) =>
        queryParams.append('situations', situation)
      )
    }

    if (durationMin !== undefined) {
      queryParams.append('durationMin', durationMin.toString())
    }

    if (durationMax !== undefined) {
      queryParams.append('durationMax', durationMax.toString())
    }

    if (releaseDateStart) {
      queryParams.append('releaseDateStart', releaseDateStart)
    }

    if (releaseDateEnd) {
      queryParams.append('releaseDateEnd', releaseDateEnd)
    }

    const url = `/movies?${queryParams.toString()}`

    const response = await api.get<MoviesListResponse>(url)
    return response.data
  },

  async getMovie(id: string): Promise<MovieFromAPI> {
    const response = await api.get<MovieFromAPI>(`/movies/${id}`)
    return response.data
  },
}
