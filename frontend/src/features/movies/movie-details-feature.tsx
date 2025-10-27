import { MovieDetailsDataSection } from './components/movie-details-data-section'
import { MovieDetailsTrailerSection } from './components/movie-details-trailer-section'
import { useMovieDetails } from './hooks/useMovieDetails'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'
import type { MovieDetails } from './types/movie-types'
import type { MovieFromAPI } from '@/shared/services/movies.service'

export type MovieDetailsFeatureProps = {
  movieId?: string
}

// Função para transformar MovieFromAPI para MovieDetails
const transformMovieData = (apiMovie: MovieFromAPI): MovieDetails => {
  return {
    id: apiMovie.id,
    primaryTitle: apiMovie.primaryTitle,
    originalTitle: apiMovie.originalTitle,
    primaryImageUrl: apiMovie.primaryImageUrl,
    secondaryImageUrl: apiMovie.secondaryImageUrl,
    plot: apiMovie.plot,
    subTitle: apiMovie.subTitle,
    releaseDate: apiMovie.releaseDate,
    runtimeSeconds: apiMovie.runtimeSeconds,
    classification: apiMovie.classification.name,
    situation: apiMovie.situation.name as MovieDetails['situation'],
    language: apiMovie.languages[0]
      ? {
          id: parseInt(apiMovie.languages[0].language.id),
          code: apiMovie.languages[0].language.code,
          name: apiMovie.languages[0].language.name,
        }
      : { id: 1, code: 'pt', name: 'Português' },
    genres: apiMovie.genres.map((g) => ({
      id: parseInt(g.genre.id),
      name: g.genre.name,
    })),
    aggregateRating: apiMovie.aggregateRating,
    voteCount: apiMovie.voteCount,
    budget: apiMovie.budget,
    revenue: apiMovie.revenue,
    profit: apiMovie.profit,
    trailerUrl: apiMovie.trailerUrl,
  }
}

export default function MovieDetailsFeature({
  movieId,
}: MovieDetailsFeatureProps) {
  const { data, isLoading, isError } = useMovieDetails(movieId)

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center p-8">
        <Typography variant="p" className="text-white">
          Carregando detalhes do filme...
        </Typography>
      </Container>
    )
  }

  if (isError || !data) {
    return (
      <Container className="flex items-center justify-center p-8">
        <Typography variant="p" className="text-red-400">
          Erro ao carregar detalhes do filme.
        </Typography>
      </Container>
    )
  }

  const movie = transformMovieData(data)

  return (
    <>
      <MovieDetailsDataSection movie={movie} />
      <MovieDetailsTrailerSection movie={movie} />
    </>
  )
}
