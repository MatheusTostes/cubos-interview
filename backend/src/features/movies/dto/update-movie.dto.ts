import { PartialType, OmitType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'
import { CreateMovieDto } from './create-movie.dto'

export class UpdateMovieDto extends PartialType(
  OmitType(CreateMovieDto, [
    'languageIds',
    'genreIds',
    'classificationId',
    'situationId',
  ] as const)
) {
  @ApiProperty({
    example: ['lang-id-1', 'lang-id-2'],
    description: 'IDs dos idiomas',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languageIds?: string[]

  @ApiProperty({
    example: ['genre-id-1', 'genre-id-2'],
    description: 'IDs dos gêneros',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genreIds?: string[]
}
