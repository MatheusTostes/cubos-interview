import { MovieDetails } from '../../types/movie-types'
import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { SinopseCard } from './sinopse-card'
import { GenresCard } from './genres-card'
import { InfoCard } from './info-card'
import { formatCurrency, runtimeSecondsToHours } from '@/shared/utils/utils'

export type DetailsMovieInfosProps = {
  movie: MovieDetails
}

export const DetailsMovieInfos = ({ movie }: DetailsMovieInfosProps) => {
  return (
    <HStack className="flex-col gap-4 min-[1145px]:flex-row">
      <VStack className="w-full gap-4 min-[1145px]:w-1/2">
        <SinopseCard title="Sinopse" value={movie.plot} className="w-full" />

        <GenresCard title="Gêneros" genres={movie.genres} />
      </VStack>

      <VStack className="w-full gap-4 min-[1145px]:w-1/2">
        <HStack className="gap-4">
          <InfoCard
            title="Lançamento"
            className="w-1/2"
            value={new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
          />

          <InfoCard
            title="Duração"
            className="w-1/2"
            value={runtimeSecondsToHours(movie.runtimeSeconds)}
          />
        </HStack>

        <HStack className="gap-4">
          <InfoCard
            title="Situação"
            className="w-1/2"
            value={movie.situation}
          />

          <InfoCard
            title="Idioma"
            className="w-1/2"
            value={movie.language.name}
          />
        </HStack>

        <HStack className="gap-4">
          <InfoCard
            title="Orçamento"
            className="w-1/2"
            value={formatCurrency(movie.budget)}
          />

          <InfoCard
            title="Receita"
            className="w-1/2"
            value={formatCurrency(movie.revenue)}
          />

          <InfoCard
            title="Lucro"
            className="w-1/2"
            value={formatCurrency(movie.profit)}
          />
        </HStack>
      </VStack>
    </HStack>
  )
}
