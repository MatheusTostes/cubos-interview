import { api } from '@/shared/services/api'
import type { Genre } from '../types/genre'

export const genresService = {
  async getGenres(): Promise<Genre[]> {
    const response = await api.get<Genre[]>('/genres')
    return response.data
  },

  async getGenre(id: string): Promise<Genre> {
    const response = await api.get<Genre>(`/genres/${id}`)
    return response.data
  },
}
