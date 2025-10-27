import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))

  // Global prefix
  app.setGlobalPrefix('api')

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Cubos Interview API')
    .setDescription('API para sistema de filmes')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Digite o token JWT',
        in: 'header',
      },
      'JWT-auth'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.PORT || 3000
  const logger = app.get(Logger)

  await app.listen(port)

  logger.log(`Application is running on: http://localhost:${port}`)
  logger.log(`Swagger documentation: http://localhost:${port}/api/docs`)
}

bootstrap()
