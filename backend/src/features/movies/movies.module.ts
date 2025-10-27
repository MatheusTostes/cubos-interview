import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'
import { UploadModule } from '../upload/upload.module'
import { EmailModule } from '../email/email.module'
import { MovieNotificationProcessor } from './processors/movie-notification.processor'
import { PrismaModule } from '../../shared/prisma/prisma.module'

@Module({
  imports: [
    UploadModule,
    EmailModule,
    PrismaModule,
    BullModule.registerQueue({
      name: 'movie-notifications',
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieNotificationProcessor],
})
export class MoviesModule {}
