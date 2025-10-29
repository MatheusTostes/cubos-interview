import { useQuery } from '@tanstack/react-query'
import { genresService } from '../services/genres.service'

export const useGenres = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => genresService.getGenres(),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutos (genres não mudam com frequência)
  })
}

export const useGenre = (id?: string) => {
  return useQuery({
    queryKey: ['genre', id],
    queryFn: () => genresService.getGenre(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}
