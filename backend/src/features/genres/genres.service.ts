import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.genre.findUnique({
      where: { id },
      include: {
        movies: {
          include: {
            movie: {
              select: {
                id: true,
                primaryTitle: true,
                primaryImageUrl: true,
              },
            },
          },
        },
      },
    })
  }
}
