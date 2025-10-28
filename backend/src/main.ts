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

  // CORS - Aceita qualquer origem durante desenvolvimento
  // TODO: Restringir para URLs específicas em produção
  app.enableCors({
    origin: true, // Aceita qualquer origem
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
  const host = process.env.HOST || '0.0.0.0' // Aceita conexões de qualquer dispositivo na rede
  const logger = app.get(Logger)

  await app.listen(port, host)

  const localUrl = `http://localhost:${port}`
  const networkUrl = `http://0.0.0.0:${port}`
  logger.log(`Application is running locally at: ${localUrl}`)
  logger.log(`Application is accessible on network at: ${networkUrl}`)
  logger.log(`Swagger documentation: ${localUrl}/api/docs`)
}

bootstrap()
