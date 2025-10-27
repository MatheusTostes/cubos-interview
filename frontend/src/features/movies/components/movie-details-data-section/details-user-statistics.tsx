import { MovieDetails } from '../../types/movie-types'

import { HStack } from '@/shared/components/atoms/hstack'
import { InfoCard } from './info-card'
import { VStack } from '@/shared/components/atoms/vstack'
import { RatingCircleGraph } from '../rating-circle-graph'

export type DetailsUserStatisticsProps = {
  movie: MovieDetails
}

export const DetailsUserStatistics = ({
  movie,
}: DetailsUserStatisticsProps) => {
  return (
    <HStack className="h-20 w-full min-w-0 flex-row items-center gap-4 min-[540px]:h-auto min-[1145px]:w-1/2 min-[1145px]:flex-col-reverse min-[1300px]:flex-row">
      <HStack className="w-full min-w-0 flex-shrink items-center gap-4 min-[1300px]:w-auto min-[1361px]:flex-shrink-0">
        <InfoCard
          title="Classificação Indicativa"
          value={`${movie.classification} anos`}
          className="min-w-0 flex-shrink min-[540px]:w-full min-[1361px]:flex-shrink"
        />

        <InfoCard
          className="min-w-20 flex-shrink min-[540px]:w-full min-[1361px]:w-auto"
          title="Votos"
          value={movie.rating.voteCount.toString()}
        />
      </HStack>

      <VStack className="-ml-7 flex-shrink-0 scale-[0.6] rounded-full bg-black/20 backdrop-blur-sm min-[540px]:-ml-3 min-[1145px]:scale-75">
        <RatingCircleGraph rating={movie.rating.aggregateRating} />
      </VStack>
    </HStack>
  )
}
