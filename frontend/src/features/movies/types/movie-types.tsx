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
  effectPhrase: string
  releaseDate: string
  runtimeSeconds: number
  classification: string
  situation:
    | 'Released'
    | 'Upcoming'
    | 'In Production'
    | 'Post Production'
    | 'Cancelled'
    | 'Paused'
    | 'Completed'
  language: Language
  genres: Genre[]
  rating: {
    aggregateRating: number
    voteCount: number
  }
  budget: number
  revenue: number
  profit: number
  trailerUrl: string
}

export type Language = {
  id: number
  code: string
  name: string
}

export type Genre = {
  id: number
  name: string
}
