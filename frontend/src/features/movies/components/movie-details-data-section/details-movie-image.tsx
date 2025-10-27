import { cn } from '@/shared/utils/utils'
import { MovieDetails } from '../../types/movie-types'

export const DetailsMovieImage = ({
  movie,
  className,
}: {
  movie: MovieDetails
  className: string
}) => {
  return (
    <img
      src={movie.primaryImageUrl ?? ''}
      alt={movie.primaryTitle}
      className={cn(
        'hidden h-[572px] w-[374px] rounded-sm object-cover min-[940px]:block',
        className
      )}
    />
  )
}
