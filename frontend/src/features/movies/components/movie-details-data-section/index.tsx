import { Container } from '@/shared/components/atoms/container'
import { MovieDetails } from '../../types/movie-types'
import { DetailsMovieImage } from './details-movie-image'
import { DetailsDataSectionHeader } from './details-data-section-header'
import { DetailsDataSectionContent } from './details-data-section-content'

// Mapear situação do tipo MovieDetails para o valor do formulário
const mapSituationToForm = (situation: MovieDetails['situation']): string => {
  const mapping: Record<string, string> = {
    Lançado: 'Lançado',
    'Em Breve': 'Em Breve',
    'Em Produção': 'Em Produção',
    'Pós-Produção': 'Em Produção',
    Cancelado: 'Cancelado',
    Pausado: 'Cancelado',
    Completo: 'Lançado',
  }
  return mapping[situation] || 'Lançado'
}

export type MovieDetailsDataSectionProps = {
  movie: MovieDetails
}

export const MovieDetailsDataSection = ({
  movie,
}: MovieDetailsDataSectionProps) => {
  return (
    <Container className="relative w-full overflow-hidden p-0 min-[540px]:p-6">
      {/* Background Image */}
      <Container
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat min-[540px]:block"
        style={{
          backgroundImage: `url(${movie.secondaryImageUrl})`,
        }}
      />

      {/* Overlay gradient */}
      <Container className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40 dark:from-black/100 dark:via-black/85 dark:to-black/40" />

      {/* Content */}
      <Container className="relative gap-4 p-0 px-3 min-[540px]:p-3">
        <DetailsMovieImage
          movie={movie}
          className="block w-full min-[940px]:hidden"
        />

        <DetailsDataSectionHeader
          movie={{
            id: movie.id,
            primaryTitle: movie.primaryTitle,
            originalTitle: movie.originalTitle,
            primaryImageUrl: movie.primaryImageUrl,
            secondaryImageUrl: movie.secondaryImageUrl,
            plot: movie.plot,
            subTitle: movie.subTitle,
            releaseDate: movie.releaseDate,
            runtimeSeconds: movie.runtimeSeconds,
            classification: movie.classification,
            situation: movie.situation,
            genres: movie.genres.map((g) => g.id.toString()),
            aggregateRating: movie.rating.aggregateRating,
            voteCount: movie.rating.voteCount,
            budget: movie.budget,
            revenue: movie.revenue,
            trailerUrl: movie.trailerUrl,
          }}
        />

        <DetailsDataSectionContent movie={movie} />
      </Container>
    </Container>
  )
}
