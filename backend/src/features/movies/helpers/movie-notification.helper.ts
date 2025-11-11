import { Queue } from 'bullmq'

export class MovieNotificationHelper {
  static async scheduleReleaseNotification(
    notificationQueue: Queue,
    movie: {
      id: string
      userId: string
      releaseDate: Date | string
      primaryTitle: string
    }
  ) {
    const releaseDate = new Date(movie.releaseDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Se a data de lançamento é no futuro, agendar email
    if (releaseDate > today) {
      const delay = releaseDate.getTime() - today.getTime()

      await notificationQueue.add(
        'send-release-notification',
        {
          movieId: movie.id,
          userId: movie.userId,
          releaseDate: movie.releaseDate,
          movieTitle: movie.primaryTitle,
        },
        {
          delay,
          jobId: `movie-${movie.id}`,
          removeOnComplete: true,
        }
      )
    }
  }

  static async removeScheduledNotification(
    notificationQueue: Queue,
    movieId: string
  ) {
    try {
      const job = await notificationQueue.getJob(`movie-${movieId}`)
      if (job) {
        await job.remove()
      }
    } catch (error) {
      console.error(
        `Error removing scheduled email notification for movie ${movieId}:`,
        error
      )
    }
  }
}

