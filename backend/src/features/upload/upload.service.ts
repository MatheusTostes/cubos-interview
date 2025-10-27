import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

@Injectable()
export class UploadService {
  private s3Client: S3Client
  private readonly bucketName: string
  private readonly publicUrl: string

  constructor(private configService: ConfigService) {
    // Parse da URL pública do R2
    const r2PublicUrl = this.configService.get('R2_PUBLIC_URL')
    const bucketName =
      this.configService.get('R2_BUCKET_NAME') || 'cubos-movies'
    const r2Address = this.configService.get('R2_ADDRESS')

    if (!r2PublicUrl) {
      throw new Error('R2_PUBLIC_URL não configurada')
    }

    if (!r2Address) {
      throw new Error('R2_ADDRESS não configurada')
    }

    this.bucketName = bucketName
    this.publicUrl = r2PublicUrl.endsWith('/')
      ? r2PublicUrl.slice(0, -1)
      : r2PublicUrl

    // R2 address tem o formato: https://<account-id>.r2.cloudflarestorage.com
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: r2Address,
      credentials: {
        accessKeyId: this.configService.get('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('R2_SECRET_ACCESS_KEY'),
      },
    })
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado')
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de arquivo não permitido. Use JPEG, PNG ou WebP'
      )
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Máximo: 5MB')
    }

    // Gerar nome único para o arquivo (sem pasta)
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`

    try {
      // Upload para R2
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })

      await this.s3Client.send(command)

      // Retornar URL pública (sem bucket name, apenas o filename)
      const imageUrl = `${this.publicUrl}/${fileName}`

      return {
        url: imageUrl,
        fileName,
        size: file.size,
        mimetype: file.mimetype,
      }
    } catch (error) {
      throw new BadRequestException('Erro ao fazer upload do arquivo')
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado')
    }

    const uploadPromises = files.map((file) => this.uploadImage(file))

    return Promise.all(uploadPromises)
  }
}
