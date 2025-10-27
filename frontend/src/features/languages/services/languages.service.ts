import { api } from '@/shared/services/api'
import { Language } from '../types/language'

export const languagesService = {
  async getLanguages(): Promise<Language[]> {
    const response = await api.get<Language[]>('/languages')
    return response.data
  },

  async getLanguage(id: string): Promise<Language> {
    const response = await api.get<Language>(`/languages/${id}`)
    return response.data
  },
}
