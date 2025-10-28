import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bullmq'
import { PrismaService } from '../../shared/prisma/prisma.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { UploadService } from '../upload/upload.service'

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
    @InjectQueue('movie-notifications')
    private readonly notificationQueue: Queue
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    let primaryImageUrl = createMovieDto.primaryImageUrl
    let secondaryImageUrl = createMovieDto.secondaryImageUrl

    // Se há arquivos, fazer upload
    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultipleImages(files)

      // Primeira imagem: primaryImageUrl
      if (uploadResults[0]) {
        primaryImageUrl = uploadResults[0].url
      }

      // Segunda imagem: secondaryImageUrl
      if (uploadResults[1]) {
        secondaryImageUrl = uploadResults[1].url
      }
    }

    const {
      genreIds,
      languageId,
      releaseDate,
      budget,
      revenue,
      classificationId,
      situationId,
      userId,
      ...rest
    } = createMovieDto

    // Calcula profit automaticamente
    const profit = revenue - budget

    // Cria o filme com os gêneros e um único idioma
    const movie = await this.prisma.movie.create({
      data: {
        primaryTitle: rest.primaryTitle,
        originalTitle: rest.originalTitle,
        primaryImageUrl,
        secondaryImageUrl,
        plot: rest.plot,
        subTitle: rest.subTitle,
        releaseDate: new Date(releaseDate),
        runtimeSeconds: rest.runtimeSeconds,
        trailerUrl: rest.trailerUrl,
        budget,
        revenue,
        profit,
        aggregateRating: rest.aggregateRating,
        voteCount: rest.voteCount,
        classificationId,
        situationId,
        languageId,
        userId,
        genres: {
          create: genreIds.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })

    // Verificar se a data de lançamento é futura e agendar email
    await this.scheduleReleaseNotificationIfFuture(movie)

    return movie
  }

  // Método auxiliar para agendar notificação de lançamento
  private async scheduleReleaseNotificationIfFuture(movie: any) {
    const releaseDate = new Date(movie.releaseDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Se a data de lançamento é no futuro, agendar email
    if (releaseDate > today) {
      const delay = releaseDate.getTime() - today.getTime()

      await this.notificationQueue.add(
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

  // Método temporário para testar envio de notificação imediatamente
  async testNotification(movieId: string) {
    const movie = await this.findOne(movieId)

    // Envia job imediatamente (delay: 0)
    await this.notificationQueue.add(
      'send-release-notification',
      {
        movieId: movie.id,
        userId: movie.userId,
        releaseDate: movie.releaseDate,
        movieTitle: movie.primaryTitle,
      },
      {
        delay: 0, // Processa imediatamente
        jobId: `test-movie-${movie.id}-${Date.now()}`,
        removeOnComplete: true,
      }
    )

    return {
      message: 'Notification queued for immediate processing',
      movie: movie.primaryTitle,
    }
  }

  async findAll(
    options: {
      skip?: number
      take?: number
      search?: string
      genres?: string[]
      classifications?: string[]
      situations?: string[]
      durationMin?: number
      durationMax?: number
      releaseDateStart?: string
      releaseDateEnd?: string
    } = {}
  ) {
    const {
      skip = 0,
      take = 10,
      search,
      genres,
      classifications,
      situations,
      durationMin,
      durationMax,
      releaseDateStart,
      releaseDateEnd,
    } = options

    // Construir filtros
    const where: any = {}

    // Filtro de busca por título
    if (search) {
      where.OR = [
        { primaryTitle: { contains: search, mode: 'insensitive' } },
        { originalTitle: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Filtro por gêneros (AND - filme deve ter TODOS os gêneros selecionados)
    if (genres && genres.length > 0) {
      where.AND = genres.map((genreId) => ({
        genres: {
          some: {
            genre: {
              id: genreId,
            },
          },
        },
      }))
    }

    // Filtro por classificações (agora aceita IDs)
    if (classifications && classifications.length > 0) {
      where.classificationId = { in: classifications }
    }

    // Filtro por situações (agora aceita IDs)
    if (situations && situations.length > 0) {
      where.situationId = { in: situations }
    }

    // Filtro por duração (em minutos, mas o banco armazena em segundos)
    if (durationMin !== undefined || durationMax !== undefined) {
      where.runtimeSeconds = {}
      if (durationMin !== undefined) {
        where.runtimeSeconds.gte = durationMin * 60
      }
      if (durationMax !== undefined) {
        where.runtimeSeconds.lte = durationMax * 60
      }
    }

    // Filtro por data de lançamento
    if (releaseDateStart || releaseDateEnd) {
      where.releaseDate = {}
      if (releaseDateStart) {
        where.releaseDate.gte = new Date(releaseDateStart)
      }
      if (releaseDateEnd) {
        where.releaseDate.lte = new Date(releaseDateEnd)
      }
    }

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        skip,
        take,
        where,
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
          language: true,
          classification: true,
          situation: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.movie.count({ where }),
    ])

    return {
      data: movies,
      total,
      skip,
      take,
    }
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })

    if (!movie) {
      throw new NotFoundException('Filme não encontrado')
    }

    return movie
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    files?: Array<Express.Multer.File>
  ) {
    const {
      genreIds,
      languageId,
      releaseDate,
      budget,
      revenue,
      aggregateRating,
      voteCount,
      ...rest
    } = updateMovieDto

    // Verifica se o filme existe
    const existingMovie = await this.findOne(id)

    // Upload de imagens se houver arquivos
    let primaryImageUrl = existingMovie.primaryImageUrl
    let secondaryImageUrl = existingMovie.secondaryImageUrl

    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultipleImages(files)

      // Primeira imagem é primary, segunda é secondary (se existir)
      if (uploadResults[0]) {
        primaryImageUrl = uploadResults[0].url
      }
      if (uploadResults[1]) {
        secondaryImageUrl = uploadResults[1].url
      }
    }

    // Calcula profit se budget/revenue estiverem sendo atualizados
    const profit =
      budget !== undefined && revenue !== undefined
        ? revenue - budget
        : undefined

    // Atualiza gêneros se foram enviados
    if (genreIds && genreIds.length > 0) {
      await this.prisma.movieGenre.deleteMany({
        where: { movieId: id },
      })
    }

    // Prepara dados para atualização
    const updateData: any = {
      ...rest,
      ...(primaryImageUrl && { primaryImageUrl }),
      ...(secondaryImageUrl && { secondaryImageUrl }),
      ...(budget !== undefined && { budget }),
      ...(revenue !== undefined && { revenue }),
      ...(profit !== undefined && { profit }),
      ...(releaseDate && { releaseDate: new Date(releaseDate) }),
      ...(languageId && { languageId }),
      ...(aggregateRating !== undefined && { aggregateRating }),
      ...(voteCount !== undefined && { voteCount }),
    }

    if (genreIds && genreIds.length > 0) {
      updateData.genres = {
        create: genreIds.map((genreId) => ({
          genre: { connect: { id: genreId } },
        })),
      }
    }

    // Atualiza o filme
    const updatedMovie = await this.prisma.movie.update({
      where: { id },
      data: updateData,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        language: true,
        classification: true,
        situation: true,
      },
    })

    // Se a data de lançamento foi alterada, atualiza o agendamento de email
    if (releaseDate) {
      // Remove o agendamento antigo
      await this.removeScheduledNotification(id)

      // Se a nova data é futura, agendar novo email
      const newReleaseDate = new Date(releaseDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (newReleaseDate > today) {
        await this.scheduleReleaseNotificationIfFuture(updatedMovie)
      }
    }

    return updatedMovie
  }

  async remove(id: string) {
    // Remove o agendamento de email se existir
    try {
      const job = await this.notificationQueue.getJob(`movie-${id}`)
      if (job) {
        await job.remove()
      }
    } catch (error) {
      console.error('Error removing scheduled email notification:', error)
      // Não bloqueia a deleção do filme se falhar ao remover o job
    }

    return this.prisma.movie.delete({
      where: { id },
    })
  }

  // Método para remover agendamento de email
  private async removeScheduledNotification(movieId: string) {
    try {
      const job = await this.notificationQueue.getJob(`movie-${movieId}`)
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
