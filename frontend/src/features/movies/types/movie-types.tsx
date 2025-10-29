import { Classification } from '@/features/classifications'
import { Genre } from '@/features/genres'
import { Language } from '@/features/languages'
import { Situation } from '@/features/situations'

// API Types
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
  language: Language
  classification: Classification
  situation: Situation
  owner?: {
    id: string
    name: string
    email: string
  }
}

export type Movie = {
  id: string
  primaryTitle: string
  primaryImageUrl: string
  genres: string[]
  rating: {
    aggregateRating: number
    voteCount: number
  }
}

export type MovieDetails = {
  id: string
  primaryTitle: string
  originalTitle: string
  primaryImageUrl: string
  secondaryImageUrl: string
  plot: string
  subTitle: string
  releaseDate: string
  runtimeSeconds: number
  classification: string
  classificationId?: string
  classificationObj?: Classification
  situation: string
  situationId?: string
  situationObj?: Situation
  language: Language
  languageId?: string
  languageObj?: Language
  genres: Genre[]
  genreIds?: string[]
  genresObj?: Genre[]
  aggregateRating: number
  voteCount: number
  budget: number
  revenue: number
  profit: number
  trailerUrl: string
  userId: string
  owner?: {
    id: string
    name: string
    email: string
  }
}
