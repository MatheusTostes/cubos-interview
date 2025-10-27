import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { AddMovieDrawer } from '../../components/movies-list/add-movie-drawer'
import { DeleteMovieDialog } from './delete-movie-dialog'
import { useAuth } from '@/shared/hooks'
import type { MovieDetails } from '../../types/movie-types'

export type DetailsDataSectionHeaderProps = {
  movie?: MovieDetails
}

export const DetailsDataSectionHeader = ({
  movie,
}: DetailsDataSectionHeaderProps) => {
  const { user } = useAuth()

  // Verifica se o usuário logado é o dono do filme
  const isOwner = movie && user?.id === movie.userId
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

      {movie && (
        <HStack className="my-auto gap-4">
          <DeleteMovieDialog movie={movie} disabled={!isOwner as any} />
          <EditMovieButton movie={movie} disabled={!isOwner} />
        </HStack>
      )}
    </HStack>
  )
}

const EditMovieButton = ({
  movie,
  disabled,
}: {
  movie?: MovieDetails
  disabled?: boolean
}) => {
  const sanatizeInitialData = (movie: MovieDetails) => {
    // Preserve runtimeSeconds for the drawer to calculate hours/minutes
    const data: any = {
      ...movie,
      runtimeSeconds: movie.runtimeSeconds, // Keep original value
    }
    return data
  }

  if (!movie) {
    return null
  }

  return (
    <AddMovieDrawer
      initialData={sanatizeInitialData(movie)}
      mode="edit"
      disabled={disabled}
    />
  )
}
