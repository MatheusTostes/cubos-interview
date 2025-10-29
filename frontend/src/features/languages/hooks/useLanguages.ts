import { useQuery } from '@tanstack/react-query'
import { languagesService } from '../services/languages.service'

export const useLanguages = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => languagesService.getLanguages(),
    enabled,
    staleTime: Infinity,
  })
}

export const useLanguage = (id?: string) => {
  return useQuery({
    queryKey: ['language', id],
    queryFn: () => languagesService.getLanguage(id!),
    enabled: !!id,
    staleTime: Infinity,
  })
}
