import { MovieDetailsDataSection } from './components/movie-details-data-section'
import { MovieDetailsDataSectionSkeleton } from './components/movie-details-data-section/movie-details-data-section-skeleton'
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
  const transformed = {
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
    // Pass full classification object
    classificationObj: apiMovie.classification,
    classificationId: apiMovie.classificationId,
    situation: apiMovie.situation.name as MovieDetails['situation'],
    // Pass full situation object
    situationObj: apiMovie.situation,
    situationId: apiMovie.situationId,
    language: apiMovie.language
      ? {
          id: apiMovie.language.id,
          code: apiMovie.language.code,
          name: apiMovie.language.name,
        }
      : { id: 'default', code: 'pt', name: 'Português' },
    // Pass full language object
    languageObj: apiMovie.language,
    languageId: apiMovie.languageId,
    genres: apiMovie.genres.map((g) => ({
      id: g.genre.id, // Keep as string
      name: g.genre.name,
    })),
    // Pass genre IDs for select
    genreIds: apiMovie.genres.map((g) => g.genre.id),
    aggregateRating: apiMovie.aggregateRating,
    voteCount: apiMovie.voteCount,
    budget: apiMovie.budget,
    revenue: apiMovie.revenue,
    profit: apiMovie.profit,
    trailerUrl: apiMovie.trailerUrl,
    userId: apiMovie.userId,
    owner: apiMovie.owner,
  }

  return transformed
}

export default function MovieDetailsFeature({
  movieId,
}: MovieDetailsFeatureProps) {
  const { data, isLoading, isError } = useMovieDetails(movieId)

  if (isLoading) {
    return (
      <Container className="relative w-full overflow-hidden p-0 min-[540px]:p-6">
        {/* Background skeleton */}
        <Container className="absolute inset-0 hidden bg-mauve-700 min-[540px]:block" />

        {/* Overlay gradient */}
        <Container className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40 dark:from-black/100 dark:via-black/85 dark:to-black/40" />

        {/* Content with skeleton */}
        <Container className="relative gap-4 p-0 px-3 min-[540px]:p-3">
          <MovieDetailsDataSectionSkeleton />
        </Container>
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
