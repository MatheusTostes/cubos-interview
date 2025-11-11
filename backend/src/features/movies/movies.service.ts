import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bullmq'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { CreateMovieUseCase } from './use-cases/create-movie.use-case'
import { UpdateMovieUseCase } from './use-cases/update-movie.use-case'
import { DeleteMovieUseCase } from './use-cases/delete-movie.use-case'
import { FindMovieUseCase } from './use-cases/find-movie.use-case'
import {
  FindMoviesUseCase,
  FindMoviesOptions,
} from './use-cases/find-movies.use-case'

@Injectable()
export class MoviesService {
  constructor(
    private createMovieUseCase: CreateMovieUseCase,
    private updateMovieUseCase: UpdateMovieUseCase,
    private deleteMovieUseCase: DeleteMovieUseCase,
    private findMovieUseCase: FindMovieUseCase,
    private findMoviesUseCase: FindMoviesUseCase,
    @InjectQueue('movie-notifications')
    private readonly notificationQueue: Queue
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    return this.createMovieUseCase.execute(createMovieDto, files)
  }

  async findAll(options: FindMoviesOptions = {}) {
    return this.findMoviesUseCase.execute(options)
  }

  async findOne(id: string) {
    return this.findMovieUseCase.execute(id)
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    return this.updateMovieUseCase.execute(id, updateMovieDto, files)
  }

  async remove(id: string) {
    return this.deleteMovieUseCase.execute(id)
  }

  // Método temporário para testar envio de notificação imediatamente
  async testNotification(movieId: string) {
    const movie = await this.findOne(movieId)

    await this.notificationQueue.add(
      'send-release-notification',
      {
        movieId: movie.id,
        userId: movie.userId,
        releaseDate: movie.releaseDate,
        movieTitle: movie.primaryTitle,
      },
      {
        delay: 0,
        jobId: `test-movie-${movie.id}-${Date.now()}`,
        removeOnComplete: true,
      }
    )

    return {
      message: 'Notification queued for immediate processing',
      movie: movie.primaryTitle,
    }
  }
}
