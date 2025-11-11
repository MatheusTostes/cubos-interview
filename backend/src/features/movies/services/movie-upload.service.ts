import { Injectable } from '@nestjs/common'
import { UploadService } from '../../upload/upload.service'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { UpdateMovieDto } from '../dto/update-movie.dto'

export interface ImageUrls {
  primaryImageUrl?: string
  secondaryImageUrl?: string
}

@Injectable()
export class MovieUploadService {
  constructor(private uploadService: UploadService) {}

  async processImages(
    createMovieDto: CreateMovieDto,
    files?: Array<Express.Multer.File>
  ): Promise<ImageUrls> {
    const imageUrls: ImageUrls = {
      primaryImageUrl: createMovieDto.primaryImageUrl,
      secondaryImageUrl: createMovieDto.secondaryImageUrl,
    }

    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultipleImages(files)

      if (uploadResults[0]) {
        imageUrls.primaryImageUrl = uploadResults[0].url
      }

      if (uploadResults[1]) {
        imageUrls.secondaryImageUrl = uploadResults[1].url
      }
    }

    return imageUrls
  }

  async processImagesForUpdate(
    existingMovie: any,
    updateMovieDto: UpdateMovieDto,
    files?: Array<Express.Multer.File>
  ): Promise<ImageUrls> {
    const imageUrls: ImageUrls = {
      primaryImageUrl: existingMovie.primaryImageUrl,
      secondaryImageUrl: existingMovie.secondaryImageUrl,
    }

    if (files && files.length > 0) {
      const uploadResults = await this.uploadService.uploadMultipleImages(files)

      if (uploadResults[0]) {
        imageUrls.primaryImageUrl = uploadResults[0].url
      }

      if (uploadResults[1]) {
        imageUrls.secondaryImageUrl = uploadResults[1].url
      }
    }

    return imageUrls
  }
}
