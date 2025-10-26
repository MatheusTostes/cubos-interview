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

export type MoviesResponse = {
  titles: Movie[]
  totalCount: number
  nextPageToken: string
}
