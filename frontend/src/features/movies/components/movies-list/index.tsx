import { MovieCard } from './movie-card'
import { movieMocks } from '../../mocks/movie-mocks'
import { Container } from '@/shared/components/atoms/container'

export const MovieList = () => {
  return (
    <Container className="grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movieMocks.slice(0, 8).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Container>
  )
}
