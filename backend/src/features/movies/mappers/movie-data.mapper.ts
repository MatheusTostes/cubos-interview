import { CreateMovieDto } from '../dto/create-movie.dto'
import { UpdateMovieDto } from '../dto/update-movie.dto'
import {
  MovieCreateData,
  MovieUpdateData,
} from '../../../shared/repositories/movie.repository'
import { ImageUrls } from '../services/movie-upload.service'

export class MovieDataMapper {
  static toCreateData(
    dto: CreateMovieDto,
    imageUrls: ImageUrls
  ): MovieCreateData {
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
    } = dto

    return {
      primaryTitle: rest.primaryTitle,
      originalTitle: rest.originalTitle,
      primaryImageUrl: imageUrls.primaryImageUrl || '',
      secondaryImageUrl: imageUrls.secondaryImageUrl || '',
      plot: rest.plot,
      subTitle: rest.subTitle,
      releaseDate: new Date(releaseDate),
      runtimeSeconds: rest.runtimeSeconds,
      trailerUrl: rest.trailerUrl,
      budget,
      revenue,
      profit: revenue - budget,
      aggregateRating: rest.aggregateRating,
      voteCount: rest.voteCount,
      classificationId,
      situationId,
      languageId,
      userId,
      genreIds,
    }
  }

  static toUpdateData(
    dto: UpdateMovieDto,
    imageUrls: ImageUrls
  ): MovieUpdateData {
    const {
      genreIds,
      languageId,
      releaseDate,
      budget,
      revenue,
      aggregateRating,
      voteCount,
      ...rest
    } = dto

    const updateData: MovieUpdateData = {
      ...rest,
      ...(imageUrls.primaryImageUrl && {
        primaryImageUrl: imageUrls.primaryImageUrl,
      }),
      ...(imageUrls.secondaryImageUrl && {
        secondaryImageUrl: imageUrls.secondaryImageUrl,
      }),
      ...(budget !== undefined && { budget }),
      ...(revenue !== undefined && { revenue }),
      ...(releaseDate && { releaseDate: new Date(releaseDate) }),
      ...(languageId && { languageId }),
      ...(aggregateRating !== undefined && { aggregateRating }),
      ...(voteCount !== undefined && { voteCount }),
      ...(genreIds && genreIds.length > 0 && { genreIds }),
    }

    if (budget !== undefined && revenue !== undefined) {
      updateData.profit = revenue - budget
    }

    return updateData
  }
}
