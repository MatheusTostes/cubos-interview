import { MovieCard } from './movie-card'
import { MovieCardSkeleton } from './movie-card-skeleton'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'
import { type MovieFromAPI, type Movie } from '../../types/movie-types'

interface MovieListProps {
  movies: MovieFromAPI[]
  isLoading?: boolean
  isError?: boolean
}

// Função para transformar os dados da API para o formato do MovieCard
const transformMovieData = (apiMovie: MovieFromAPI): Movie => {
  return {
    id: apiMovie.id,
    primaryTitle: apiMovie.primaryTitle,
    primaryImageUrl: apiMovie.primaryImageUrl,
    genres: apiMovie.genres.map((g) => g.genre.name),
    rating: {
      aggregateRating: apiMovie.aggregateRating,
      voteCount: apiMovie.voteCount,
    },
  }
}

const SKELETON_COUNT = 10

export const MovieList = ({ movies, isLoading, isError }: MovieListProps) => {
  if (isLoading) {
    return (
      <Container className="grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="flex items-center justify-center rounded-sm bg-white/10 p-8 backdrop-blur-[3px]">
        <Typography variant="p" className="text-red-400">
          Erro ao carregar filmes. Tente novamente.
        </Typography>
      </Container>
    )
  }

  if (movies.length === 0) {
    return (
      <Container className="flex items-center justify-center rounded-sm bg-white/10 p-8 backdrop-blur-[3px]">
        <Typography variant="p" className="text-white">
          Nenhum filme encontrado.
        </Typography>
      </Container>
    )
  }

  return (
    <Container className="grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={transformMovieData(movie)} />
      ))}
    </Container>
  )
}
