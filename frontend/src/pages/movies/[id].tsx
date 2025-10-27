import MovieDetailsFeature from '@/features/movies/movie-details-feature'
import { Container } from '@/shared/components/atoms/container'
import { useParams } from 'react-router-dom'

export default function MoviePage() {
  const { id } = useParams()

  return (
    <Container className="gap-6 p-4 px-0 sm:p-6">
      <MovieDetailsFeature movieId={id} />
    </Container>
  )
}
