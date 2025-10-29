import { useQuery } from '@tanstack/react-query'
import { situationsService } from '../services/situations.service'

export const useSituations = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['situations'],
    queryFn: () => situationsService.getSituations(),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useSituation = (id?: string) => {
  return useQuery({
    queryKey: ['situation', id],
    queryFn: () => situationsService.getSituation(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}
