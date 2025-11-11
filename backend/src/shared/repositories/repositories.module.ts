import { Module } from '@nestjs/common'
import { MovieRepository } from './movie.repository'
import { UserRepository } from './user.repository'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [MovieRepository, UserRepository],
  exports: [MovieRepository, UserRepository],
})
export class RepositoriesModule {}

