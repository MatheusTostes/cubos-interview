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
  classificationObj?: { id: string; name: string }
  situation:
    | 'Lançado'
    | 'Em Breve'
    | 'Em Produção'
    | 'Pós-Produção'
    | 'Cancelado'
    | 'Pausado'
    | 'Completo'
  situationId?: string
  situationObj?: { id: string; name: string }
  language: Language
  languageId?: string
  languageObj?: { id: string; code: string; name: string }
  genres: Genre[]
  genreIds?: string[]
  genresObj?: Array<{ genre: { id: string; name: string } }>
  aggregateRating: number
  voteCount: number
  budget: number
  revenue: number
  profit: number
  trailerUrl: string
}

export type Language = {
  id: string
  code: string
  name: string
}

export type Genre = {
  id: string
  name: string
}
