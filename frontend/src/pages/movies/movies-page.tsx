import ListMoviesFeature from '@/features/movies/list-movies-feature'
import { Container } from '@/shared/components/atoms/container'

export default function MoviesPage() {
  return (
    <Container className="gap-6 p-4 px-0 sm:p-6">
      <ListMoviesFeature />
    </Container>
  )
}
