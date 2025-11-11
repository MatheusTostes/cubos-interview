import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bullmq'
import { MovieNotificationHelper } from '../helpers/movie-notification.helper'

@Injectable()
export class MovieNotificationService {
  constructor(
    @InjectQueue('movie-notifications')
    private readonly notificationQueue: Queue
  ) {}

  async scheduleIfFuture(movie: {
    id: string
    userId: string
    releaseDate: Date | string
    primaryTitle: string
  }) {
    await MovieNotificationHelper.scheduleReleaseNotification(
      this.notificationQueue,
      movie
    )
  }

  async updateSchedule(movieId: string, movie: any) {
    await MovieNotificationHelper.removeScheduledNotification(
      this.notificationQueue,
      movieId
    )

    const newReleaseDate = new Date(movie.releaseDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (newReleaseDate > today) {
      await MovieNotificationHelper.scheduleReleaseNotification(
        this.notificationQueue,
        movie
      )
    }
  }

  async removeSchedule(movieId: string) {
    await MovieNotificationHelper.removeScheduledNotification(
      this.notificationQueue,
      movieId
    )
  }
}
