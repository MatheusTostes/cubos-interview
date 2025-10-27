import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { DetailsMovieImage } from './details-movie-image'
import { Typography } from '@/shared/components/atoms/typography'
import { MovieDetails } from '../../types/movie-types'
import { DetailsUserStatistics } from './details-user-statistics'
import { DetailsMovieInfos } from './details-movie-infos'

export type DetailsDataSectionContentProps = {
  movie: MovieDetails
}

export const DetailsDataSectionContent = ({
  movie,
}: DetailsDataSectionContentProps) => {
  return (
    <HStack className="min-w-0 gap-4">
      <DetailsMovieImage movie={movie} className="hidden min-[940px]:block" />
      <VStack className="min-w-0 gap-4">
        <HStack className="min-w-0 flex-col-reverse items-center gap-4 min-[1145px]:flex-row">
          <VStack className="w-full items-center p-0 min-[1145px]:w-1/2 min-[1145px]:items-start min-[1145px]:p-4">
            <Typography variant="p" font="montserrat" className="italic">
              {movie.subTitle}
            </Typography>
          </VStack>

          <DetailsUserStatistics movie={movie} />
        </HStack>

        <DetailsMovieInfos movie={movie} />
      </VStack>
    </HStack>
  )
}
