import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const {
      genreIds,
      languageIds,
      releaseDate,
      budget,
      revenue,
      classificationId,
      situationId,
      ...rest
    } = createMovieDto

    // Calcula profit automaticamente
    const profit = revenue - budget

    // Cria o filme com os gêneros e idiomas
    const movie = await this.prisma.movie.create({
      data: {
        ...rest,
        budget,
        revenue,
        profit,
        releaseDate: new Date(releaseDate),
        classificationId,
        situationId,
        genres: {
          create: genreIds.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
        languages: {
          create: languageIds.map((languageId) => ({
            language: { connect: { id: languageId } },
          })),
        },
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        classification: true,
        situation: true,
      },
    })

    return movie
  }

  async findAll(
    options: {
      skip?: number
      take?: number
      search?: string
      genres?: string[]
      classifications?: string[]
      situations?: string[]
    } = {}
  ) {
    const {
      skip = 0,
      take = 10,
      search,
      genres,
      classifications,
      situations,
    } = options

    console.log('🎬 [Movies Service] findAll called with options:', options)

    // Construir filtros
    const where: any = {}

    // Filtro de busca por título
    if (search) {
      where.OR = [
        { primaryTitle: { contains: search, mode: 'insensitive' } },
        { originalTitle: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Filtro por gêneros (AND - filme deve ter TODOS os gêneros selecionados)
    if (genres && genres.length > 0) {
      where.AND = genres.map((genreId) => ({
        genres: {
          some: {
            genre: {
              id: genreId,
            },
          },
        },
      }))
    }

    // Filtro por classificações (agora aceita IDs)
    if (classifications && classifications.length > 0) {
      where.classificationId = { in: classifications }
    }

    // Filtro por situações (agora aceita IDs)
    if (situations && situations.length > 0) {
      where.situationId = { in: situations }
    }

    console.log(
      '🔍 [Movies Service] Prisma where clause:',
      JSON.stringify(where, null, 2)
    )

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        skip,
        take,
        where,
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
          languages: {
            include: {
              language: true,
            },
          },
          classification: true,
          situation: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.movie.count({ where }),
    ])

    console.log(
      `✅ [Movies Service] Found ${total} movies, returning ${movies.length}`
    )

    return {
      data: movies,
      total,
      skip,
      take,
    }
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        classification: true,
        situation: true,
      },
    })

    if (!movie) {
      throw new NotFoundException('Filme não encontrado')
    }

    return movie
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const { genreIds, languageIds, releaseDate, budget, revenue, ...rest } =
      updateMovieDto

    // Verifica se o filme existe
    await this.findOne(id)

    // Calcula profit se budget/revenue estiverem sendo atualizados
    const profit =
      budget !== undefined && revenue !== undefined
        ? revenue - budget
        : undefined

    // Atualiza gêneros se foram enviados
    if (genreIds) {
      await this.prisma.movieGenre.deleteMany({
        where: { movieId: id },
      })
    }

    // Atualiza idiomas se foram enviados
    if (languageIds) {
      await this.prisma.movieLanguage.deleteMany({
        where: { movieId: id },
      })
    }

    // Prepara dados para atualização
    const updateData: any = {
      ...rest,
      ...(budget !== undefined && { budget }),
      ...(revenue !== undefined && { revenue }),
      ...(profit !== undefined && { profit }),
      ...(releaseDate && { releaseDate: new Date(releaseDate) }),
    }

    if (genreIds) {
      updateData.genres = {
        create: genreIds.map((genreId) => ({
          genre: { connect: { id: genreId } },
        })),
      }
    }

    if (languageIds) {
      updateData.languages = {
        create: languageIds.map((languageId) => ({
          language: { connect: { id: languageId } },
        })),
      }
    }

    // Atualiza o filme
    return this.prisma.movie.update({
      where: { id },
      data: updateData,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        classification: true,
        situation: true,
      },
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.movie.delete({
      where: { id },
    })
  }
}
