import { PartialType, OmitType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'
import { CreateMovieDto } from './create-movie.dto'

export class UpdateMovieDto extends PartialType(
  OmitType(CreateMovieDto, [
    'genreIds',
    'classificationId',
    'situationId',
  ] as const)
) {
  @ApiProperty({
    example: 'lang-id-1',
    description: 'ID do idioma',
    required: false,
  })
  @IsString()
  @IsOptional()
  languageId?: string

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
