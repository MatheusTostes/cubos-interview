import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

export interface MovieFindManyOptions {
  skip?: number
  take?: number
  where?: Prisma.MovieWhereInput
  orderBy?: Prisma.MovieOrderByWithRelationInput
}

export interface MovieCreateData {
  primaryTitle: string
  originalTitle: string
  primaryImageUrl: string
  secondaryImageUrl: string
  plot: string
  subTitle: string
  releaseDate: Date
  runtimeSeconds: number
  trailerUrl: string
  budget: number
  revenue: number
  profit: number
  aggregateRating?: number
  voteCount?: number
  classificationId: string
  situationId: string
  languageId: string
  userId: string
  genreIds: string[]
}

export interface MovieUpdateData {
  primaryTitle?: string
  originalTitle?: string
  primaryImageUrl?: string
  secondaryImageUrl?: string
  plot?: string
  subTitle?: string
  releaseDate?: Date
  runtimeSeconds?: number
  trailerUrl?: string
  budget?: number
  revenue?: number
  profit?: number
  aggregateRating?: number
  voteCount?: number
  classificationId?: string
  situationId?: string
  languageId?: string
  genreIds?: string[]
}

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: MovieCreateData) {
    const { genreIds, ...movieData } = data

    return this.prisma.movie.create({
      data: {
        ...movieData,
        genres: {
          create: genreIds.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })
  }

  async findMany(options: MovieFindManyOptions = {}) {
    const { skip = 0, take = 10, where, orderBy } = options

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
          language: true,
          classification: true,
          situation: true,
        },
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.movie.count({ where }),
    ])

    return {
      data: movies,
      total,
      skip,
      take,
    }
  }

  async findOne(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })
  }

  async update(id: string, data: MovieUpdateData) {
    const { genreIds, ...updateData } = data

    // Se há gêneros para atualizar, primeiro remove os existentes
    if (genreIds && genreIds.length > 0) {
      await this.prisma.movieGenre.deleteMany({
        where: { movieId: id },
      })
    }

    return this.prisma.movie.update({
      where: { id },
      data: {
        ...updateData,
        ...(genreIds &&
          genreIds.length > 0 && {
            genres: {
              create: genreIds.map((genreId) => ({
                genre: { connect: { id: genreId } },
              })),
            },
          }),
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })
  }

  async delete(id: string) {
    return this.prisma.movie.delete({
      where: { id },
    })
  }

  async count(where?: Prisma.MovieWhereInput) {
    return this.prisma.movie.count({ where })
  }
}
