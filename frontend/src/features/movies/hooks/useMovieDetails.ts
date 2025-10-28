import { useQuery } from '@tanstack/react-query'
import { moviesService } from '@/features/movies/services/movies.service'

export const useMovieDetails = (movieId: string | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => {
      if (!movieId) {
        throw new Error('Movie ID is required')
      }
      return moviesService.getMovie(movieId)
    },
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
