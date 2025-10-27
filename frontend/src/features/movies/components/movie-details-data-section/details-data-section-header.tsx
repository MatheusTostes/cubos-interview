import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { AddMovieDrawer } from '../../components/movies-list/add-movie-drawer'
import { DeleteMovieDialog } from './delete-movie-dialog'
import type { MovieDetails } from '../../types/movie-types'

export type DetailsDataSectionHeaderProps = {
  movie?: MovieDetails
}

export const DetailsDataSectionHeader = ({
  movie,
}: DetailsDataSectionHeaderProps) => {
  return (
    <HStack className="flex-col-reverse justify-between gap-2 min-[540px]:flex-row">
      <VStack className="w-full items-center min-[540px]:items-start">
        <Typography
          variant="h2"
          className="text-[32px] font-semibold"
          font="montserrat"
        >
          {movie?.primaryTitle || 'Título'}
        </Typography>
        <Typography variant="span" font="montserrat">
          Título Original: {movie?.originalTitle || 'Título Original'}
        </Typography>
      </VStack>

      <HStack className="my-auto gap-4">
        {movie && <DeleteMovieDialog movie={movie} />}
        <EditMovieButton movie={movie} />
      </HStack>
    </HStack>
  )
}

const EditMovieButton = ({ movie }: { movie?: MovieDetails }) => {
  const sanatizeInitialData = (movie: MovieDetails) => {
    // Preserve runtimeSeconds for the drawer to calculate hours/minutes
    const data: any = {
      ...movie,
      runtimeSeconds: movie.runtimeSeconds, // Keep original value
    }
    return data
  }
  return (
    <>
      {movie && (
        <AddMovieDrawer initialData={sanatizeInitialData(movie)} mode="edit" />
      )}
    </>
  )
}
