import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Injectable()
export class SituationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.situation.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.situation.findUnique({
      where: { id },
      include: {
        movies: {
          select: {
            id: true,
            primaryTitle: true,
            primaryImageUrl: true,
          },
        },
      },
    })
  }
}
