import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { LoggerModule } from 'nestjs-pino'
import { BullModule } from '@nestjs/bullmq'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './shared/prisma/prisma.module'
import { AuthModule } from './features/auth/auth.module'
import { UsersModule } from './features/users/users.module'
import { MoviesModule } from './features/movies/movies.module'
import { GenresModule } from './features/genres/genres.module'
import { LanguagesModule } from './features/languages/languages.module'
import { ClassificationsModule } from './features/classifications/classifications.module'
import { SituationsModule } from './features/situations/situations.module'
import { UploadModule } from './features/upload/upload.module'
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'
import { EmailModule } from './features/email/email.module'
import { RedisModule } from './shared/services/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: false,
                  colorize: true,
                },
              }
            : undefined,
      },
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    GenresModule,
    LanguagesModule,
    ClassificationsModule,
    SituationsModule,
    UploadModule,
    EmailModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
