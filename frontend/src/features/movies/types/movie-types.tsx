export type Movie = {
  id: string
  type: string
  primaryTitle: string
  originalTitle: string
  primaryImage: {
    url: string
    width: number
    height: number
  }
  startYear: number
  endYear?: number
  runtimeSeconds?: number
  genres: string[]
  rating: {
    aggregateRating: number
    voteCount: number
  }
  plot: string
}

export type MovieDetails = {
  id: string
  primaryTitle: string
  originalTitle: string
  primaryImage: {
    url: string
  }
  secondaryImage: {
    url: string
  }
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
