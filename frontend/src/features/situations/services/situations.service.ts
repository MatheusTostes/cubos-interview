import { api } from '@/shared/services/api'
import type { Situation } from '../types/situation'

export const situationsService = {
  async getSituations(): Promise<Situation[]> {
    const response = await api.get<Situation[]>('/situations')
    return response.data
  },

  async getSituation(id: string): Promise<Situation> {
    const response = await api.get<Situation>(`/situations/${id}`)
    return response.data
  },
}
