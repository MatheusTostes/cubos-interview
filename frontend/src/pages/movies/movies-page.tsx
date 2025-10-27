import MoviesListFeature from '@/features/movies/movies-list-feature'
import { Container } from '@/shared/components/atoms/container'

export default function MoviesPage() {
  return (
    <Container className="gap-6 p-4 px-0 sm:p-6">
      <MoviesListFeature />
    </Container>
  )
}
