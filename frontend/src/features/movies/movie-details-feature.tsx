import { MovieDetailsDataSection } from './components/movie-details-data-section'
import { MovieDetailsDataSectionSkeleton } from './components/movie-details-data-section/movie-details-data-section-skeleton'
import { MovieDetailsTrailerSection } from './components/movie-details-trailer-section'
import { useMovieDetails } from './hooks/useMovieDetails'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'
import type { MovieDetails, MovieFromAPI } from './types/movie-types'

export type MovieDetailsFeatureProps = {
  movieId?: string
}

// Função para transformar MovieFromAPI para MovieDetails
const transformMovieData = (apiMovie: MovieFromAPI): MovieDetails => {
  return {
    // Spread das propriedades idênticas
    ...apiMovie,

    // Transformações específicas
    classification: apiMovie.classification.name,
    situation: apiMovie.situation.name as MovieDetails['situation'],
    language: apiMovie.language
      ? {
          id: apiMovie.language.id,
          code: apiMovie.language.code,
          name: apiMovie.language.name,
        }
      : { id: 'default', code: 'pt', name: 'Português' },
    genres: apiMovie.genres.map((g) => ({
      id: g.genre.id,
      name: g.genre.name,
      createdAt: apiMovie.createdAt,
      updatedAt: apiMovie.updatedAt,
    })),
    genreIds: apiMovie.genres.map((g) => g.genre.id),

    // Propriedades opcionais para compatibilidade com formulários
    classificationObj: {
      ...apiMovie.classification,
      createdAt: apiMovie.createdAt,
      updatedAt: apiMovie.updatedAt,
    },
    situationObj: {
      ...apiMovie.situation,
      createdAt: apiMovie.createdAt,
      updatedAt: apiMovie.updatedAt,
    },
    languageObj: apiMovie.language,
  }
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
