import { Container } from '@/shared/components/atoms/container'
import { movieMocks } from './mocks/movie-mocks'
import { MovieCard } from './components/movie-card'

export default function ListMoviesFeature() {
  return (
    <Container className="xs:grid-cols-2 grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movieMocks.slice(0, 8).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Container>
  )
}
