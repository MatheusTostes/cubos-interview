import { Container } from '@/shared/components/atoms/container'
import { MovieDetails } from '../../types/movie-types'
import { Typography } from '@/shared/components/atoms/typography'

export type MovieDetailsTrailerSectionProps = {
  movie: MovieDetails
}

export const MovieDetailsTrailerSection = ({
  movie,
}: MovieDetailsTrailerSectionProps) => {
  // Converte URL do YouTube para formato de embed
  const getEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url)
      const videoId = urlObj.searchParams.get('v')

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }

      return url
    } catch {
      return url
    }
  }

  return (
    <Container className="relative w-full gap-4 overflow-hidden p-4 min-[540px]:p-6">
      <Typography variant="h2" font="montserrat" className="text-2xl font-bold">
        Trailer
      </Typography>

      <div className="aspect-video w-full overflow-hidden rounded-sm">
        <iframe
          src={getEmbedUrl(movie.trailerUrl)}
          title={movie.primaryTitle}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Container>
  )
}
