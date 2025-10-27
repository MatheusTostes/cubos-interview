import { Module } from '@nestjs/common'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { UploadModule } from '../upload/upload.module'

@Module({
  imports: [UploadModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
