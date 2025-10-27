import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Injectable()
export class LanguagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.language.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.language.findUnique({
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
