import { Card } from '@/shared/components/atoms/card'
import { Movie } from '../types/movie-types'
import { Typography } from '@/shared/components/atoms/typography'

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card.Root
      key={movie.id}
      className="relative h-[281px] w-full overflow-hidden  rounded-md p-0 shadow-[0_0px_5px_rgba(0,0,0,0.2)] sm:h-[355px]"
    >
      <Card.Content className="h-full w-full p-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </Card.Content>

      <Card.Footer className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-2 bg-gradient-to-t from-white to-transparent  p-4 pt-20 dark:from-black dark:to-transparent">
        <Typography variant="h5" className="font-semibold" font="montserrat">
          {movie.title}
        </Typography>
        <Typography variant="span" className="text-[12.8px]" font="montserrat">
          {movie.categories.join(', ')}
        </Typography>
      </Card.Footer>
    </Card.Root>
  )
}
