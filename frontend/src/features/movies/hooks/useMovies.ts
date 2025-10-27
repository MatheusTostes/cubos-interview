import { useQuery } from '@tanstack/react-query'
import {
  moviesService,
  type MoviesListParams,
} from '@/shared/services/movies.service'

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
