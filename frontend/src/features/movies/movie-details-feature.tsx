import { movieMock } from './mocks/movie-mocks'
import { MovieDetails } from './types/movie-types'
import { MovieDetailsDataSection } from './components/movie-details-data-section'

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

type MovieDetailsTrailerSectionProps = {
  movie: MovieDetails
}

const MovieDetailsTrailerSection = ({
  movie,
}: MovieDetailsTrailerSectionProps) => {
  return (
    <div>
      <h2>Movie Trailer {movie.primaryTitle}</h2>
    </div>
  )
}
