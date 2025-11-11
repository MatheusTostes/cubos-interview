import { Prisma } from '@prisma/client'

export interface MovieFilters {
  search?: string
  genres?: string[]
  classifications?: string[]
  situations?: string[]
  durationMin?: number
  durationMax?: number
  releaseDateStart?: string
  releaseDateEnd?: string
}

export class MovieFiltersHelper {
  static buildWhereClause(filters: MovieFilters): Prisma.MovieWhereInput {
    const where: Prisma.MovieWhereInput = {}

    // Filtro de busca por título
    if (filters.search) {
      where.OR = [
        { primaryTitle: { contains: filters.search, mode: 'insensitive' } },
        { originalTitle: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    // Filtro por gêneros (AND - filme deve ter TODOS os gêneros selecionados)
    if (filters.genres && filters.genres.length > 0) {
      where.AND = filters.genres.map((genreId) => ({
        genres: {
          some: {
            genre: {
              id: genreId,
            },
          },
        },
      }))
    }

    // Filtro por classificações
    if (filters.classifications && filters.classifications.length > 0) {
      where.classificationId = { in: filters.classifications }
    }

    // Filtro por situações
    if (filters.situations && filters.situations.length > 0) {
      where.situationId = { in: filters.situations }
    }

    // Filtro por duração (em minutos, mas o banco armazena em segundos)
    if (filters.durationMin !== undefined || filters.durationMax !== undefined) {
      where.runtimeSeconds = {}
      if (filters.durationMin !== undefined) {
        where.runtimeSeconds.gte = filters.durationMin * 60
      }
      if (filters.durationMax !== undefined) {
        where.runtimeSeconds.lte = filters.durationMax * 60
      }
    }

    // Filtro por data de lançamento
    if (filters.releaseDateStart || filters.releaseDateEnd) {
      where.releaseDate = {}
      if (filters.releaseDateStart) {
        where.releaseDate.gte = new Date(filters.releaseDateStart)
      }
      if (filters.releaseDateEnd) {
        where.releaseDate.lte = new Date(filters.releaseDateEnd)
      }
    }

    return where
  }
}

