import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bullmq'
import { Logger } from '@nestjs/common'
import { EmailService } from '../../email/email.service'
import { PrismaService } from '../../../shared/prisma/prisma.service'

interface MovieNotificationJob {
  movieId: string
  userId: string
  releaseDate: string
  movieTitle: string
}

@Processor('movie-notifications')
export class MovieNotificationProcessor {
  private readonly logger = new Logger(MovieNotificationProcessor.name)

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService
  ) {}

  @Process('send-release-notification')
  async handleSendReleaseNotification(job: Job<MovieNotificationJob>) {
    this.logger.log(`Processing notification job for movie ${job.data.movieId}`)

    try {
      // Buscar informações do usuário
      const user = await this.prisma.user.findUnique({
        where: { id: job.data.userId },
      })

      if (!user) {
        this.logger.error(`User ${job.data.userId} not found`)
        throw new Error(`User not found: ${job.data.userId}`)
      }

      // Enviar email
      await this.emailService.sendMovieReleaseNotification({
        to: user.email,
        movieTitle: job.data.movieTitle,
        releaseDate: job.data.releaseDate,
        userName: user.name,
      })

      this.logger.log(
        `Successfully sent notification for movie ${job.data.movieTitle}`
      )
    } catch (error) {
      this.logger.error(
        `Failed to process notification for movie ${job.data.movieId}:`,
        error
      )
      throw error
    }
  }
}
