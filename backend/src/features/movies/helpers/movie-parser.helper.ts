import { CreateMovieDto } from '../dto/create-movie.dto'
import { UpdateMovieDto } from '../dto/update-movie.dto'

export class MovieParserHelper {
  static parseCreateDto(body: any): CreateMovieDto {
    return {
      ...body,
      genreIds: JSON.parse(body.genreIds || '[]'),
      languageId: body.languageId,
      budget: parseFloat(body.budget),
      revenue: parseFloat(body.revenue),
      runtimeSeconds: parseInt(body.runtimeSeconds),
      aggregateRating: parseFloat(body.aggregateRating),
      voteCount: parseInt(body.voteCount),
    }
  }

  static parseUpdateDto(body: any): UpdateMovieDto {
    return {
      ...body,
      genreIds: JSON.parse(body.genreIds || '[]'),
      languageId: body.languageId,
      budget: body.budget ? parseFloat(body.budget) : undefined,
      revenue: body.revenue ? parseFloat(body.revenue) : undefined,
      runtimeSeconds: body.runtimeSeconds
        ? parseInt(body.runtimeSeconds)
        : undefined,
      aggregateRating: body.aggregateRating
        ? parseFloat(body.aggregateRating)
        : undefined,
      voteCount: body.voteCount ? parseInt(body.voteCount) : undefined,
    }
  }
}

