import { useQuery } from '@tanstack/react-query'
import {
  moviesService,
  type MoviesListParams,
} from '@/shared/services/movies.service'

export const useMovies = (params: MoviesListParams = {}) => {
  console.log('🎯 [useMovies] Hook called with params:', params)

  return useQuery({
    queryKey: ['movies', params],
    queryFn: async () => {
      console.log('🔄 [useMovies] queryFn executing...')
      try {
        const result = await moviesService.getMovies(params)
        console.log('✅ [useMovies] Query successful:', result)
        return result
      } catch (error) {
        console.error('❌ [useMovies] Query failed:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
    onError: (error) => {
      console.error('❌ [useMovies] onError callback:', error)
    },
  })
}
