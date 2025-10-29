import { useQuery } from '@tanstack/react-query'
import { classificationsService } from '../services/classifications.service'

export const useClassifications = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['classifications'],
    queryFn: () => classificationsService.getClassifications(),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useClassification = (id?: string) => {
  return useQuery({
    queryKey: ['classification', id],
    queryFn: () => classificationsService.getClassification(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}
