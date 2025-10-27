import { api } from '@/shared/services/api'
import type { Classification } from '../types/classification'

export const classificationsService = {
  async getClassifications(): Promise<Classification[]> {
    const response = await api.get<Classification[]>('/classifications')
    return response.data
  },

  async getClassification(id: string): Promise<Classification> {
    const response = await api.get<Classification>(`/classifications/${id}`)
    return response.data
  },
}
