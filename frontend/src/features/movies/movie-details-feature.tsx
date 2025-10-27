import { MovieDetailsDataSection } from './components/movie-details-data-section'
import { MovieDetailsTrailerSection } from './components/movie-details-trailer-section'
import { movieMock } from './mocks/movie-mocks'

export type MovieDetailsFeatureProps = {
  movieId?: string
}

export default function MovieDetailsFeature({
  movieId,
}: MovieDetailsFeatureProps) {
  const movie = movieMock

  return (
    <>
      <MovieDetailsDataSection movie={movie} />
      <MovieDetailsTrailerSection movie={movie} />
    </>
  )
}
