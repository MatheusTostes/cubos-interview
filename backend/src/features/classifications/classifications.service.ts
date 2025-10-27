import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma/prisma.service'

@Injectable()
export class ClassificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.classification.findMany({
      orderBy: {
        age: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.classification.findUnique({
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
