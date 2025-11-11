import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { RepositoriesModule } from '../../shared/repositories/repositories.module'

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
