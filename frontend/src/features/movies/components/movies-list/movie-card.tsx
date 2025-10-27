import { Card } from '@/shared/components/atoms/card'
import { Movie } from '../../types/movie-types'
import { Typography } from '@/shared/components/atoms/typography'
import { useState } from 'react'
import { cn } from '@/shared/utils'
import { VStack } from '@/shared/components/atoms/vstack'
import { RatingCircleGraph } from '../rating-circle-graph'
import { useNavigate } from 'react-router-dom'
import { routeHelpers } from '@/shared/constants'

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    navigate(routeHelpers.movieView(movie.id))
  }

  return (
    <Card.Root
      key={movie.id}
      className="relative h-[281px] w-full cursor-pointer  overflow-hidden rounded-md p-0 shadow-[0_0px_5px_rgba(0,0,0,0.2)] sm:h-[355px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <VStack
        className={cn(
          'transition-all duration-300 ease-in-out',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <VStack className="absolute left-[50%] top-[40%] h-32 w-32 translate-x-[-50%] translate-y-[-50%] rounded-full bg-black bg-opacity-40 backdrop-blur-sm">
          <RatingCircleGraph rating={movie.rating.aggregateRating} />
        </VStack>
      </VStack>

      <Card.Content className="h-full w-full p-0">
        <img
          src={movie.primaryImageUrl ?? ''}
          alt={movie.primaryTitle}
          className="h-full w-full object-cover"
        />
      </Card.Content>

      <Card.Footer className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-2 bg-gradient-to-t from-white to-transparent p-4 pt-40 dark:from-black dark:to-transparent">
        <Typography
          variant="h5"
          className={cn(
            'font-semibold transition-all duration-300 ease-in-out',
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-8'
          )}
          font="montserrat"
        >
          {movie.primaryTitle}
        </Typography>

        <Typography
          variant="span"
          className={cn(
            `text-[12.8px] transition-all duration-300 ease-in-out`,
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          )}
          font="montserrat"
        >
          {movie.genres.join(', ')}
        </Typography>
      </Card.Footer>
    </Card.Root>
  )
}
