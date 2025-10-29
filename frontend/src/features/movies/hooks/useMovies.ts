import { useQuery } from '@tanstack/react-query'
import { moviesService } from '@/features/movies/services/movies.service'
import type { MoviesListParams } from '../types/movie-types'

export const useMovies = (params: MoviesListParams = {}) => {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: async () => {
      return await moviesService.getMovies(params)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
  })
}
