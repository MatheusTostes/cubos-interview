import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { Button } from '@/shared/components/atoms/button'
import { AddMovieDrawer } from '../../components/movies-list/add-movie-drawer'

type MovieDetails = {
  id: string
  primaryTitle: string
  originalTitle: string
  primaryImageUrl: string
  secondaryImageUrl: string
  plot: string
  subTitle: string
  releaseDate: string
  runtimeSeconds: number
  classification: string
  situation: string
  genres: string[]
  aggregateRating: number
  voteCount: number
  budget: number
  revenue: number
  trailerUrl: string
}

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
        <Button variant="secondary">Deletar</Button>
        <EditMovieButton movie={movie} />
      </HStack>
    </HStack>
  )
}

const EditMovieButton = ({ movie }: { movie?: MovieDetails }) => {
  const sanatizeInitialData = (movie: MovieDetails) => {
    return {
      id: movie.id,
      primaryTitle: movie.primaryTitle,
      originalTitle: movie.originalTitle,
      primaryImageUrl: movie.primaryImageUrl,
      secondaryImageUrl: movie.secondaryImageUrl,
      plot: movie.plot,
      subTitle: movie.subTitle,
      releaseDate: movie.releaseDate,
      runtimeHours: Math.floor(movie.runtimeSeconds / 3600).toString(),
      runtimeMinutes: Math.floor((movie.runtimeSeconds % 3600) / 60).toString(),
      classificationId: movie.classification,
      situationId: movie.situation,
      genreIds: movie.genres,
      aggregateRating: movie.aggregateRating.toString(),
      voteCount: movie.voteCount.toString(),
      budget: movie.budget.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      revenue: movie.revenue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      trailerUrl: movie.trailerUrl,
    }
  }
  return (
    <>
      {movie && (
        <AddMovieDrawer initialData={sanatizeInitialData(movie)} mode="edit" />
      )}
    </>
  )
}
