import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { UploadModule } from '../upload/upload.module'
import { EmailModule } from '../email/email.module'
import { MovieNotificationProcessor } from './processors/movie-notification.processor'
import { RepositoriesModule } from '../../shared/repositories/repositories.module'
import { CreateMovieUseCase } from './use-cases/create-movie.use-case'
import { UpdateMovieUseCase } from './use-cases/update-movie.use-case'
import { DeleteMovieUseCase } from './use-cases/delete-movie.use-case'
import { FindMovieUseCase } from './use-cases/find-movie.use-case'
import { FindMoviesUseCase } from './use-cases/find-movies.use-case'
import { MovieUploadService } from './services/movie-upload.service'
import { MovieNotificationService } from './services/movie-notification.service'

@Module({
  imports: [
    UploadModule,
    EmailModule,
    RepositoriesModule,
    BullModule.registerQueue({
      name: 'movie-notifications',
    }),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    MovieNotificationProcessor,
    CreateMovieUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    FindMovieUseCase,
    FindMoviesUseCase,
    MovieUploadService,
    MovieNotificationService,
  ],
})
export class MoviesModule {}
