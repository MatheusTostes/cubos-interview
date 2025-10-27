import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator'

export class CreateMovieDto {
  @ApiProperty({ example: 'Matrix', description: 'Título principal' })
  @IsString()
  @IsNotEmpty()
  primaryTitle: string

  @ApiProperty({ example: 'The Matrix', description: 'Título original' })
  @IsString()
  @IsNotEmpty()
  originalTitle: string

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL da imagem principal',
  })
  @IsString()
  @IsNotEmpty()
  primaryImageUrl: string

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'URL da imagem secundária',
  })
  @IsString()
  @IsNotEmpty()
  secondaryImageUrl: string

  @ApiProperty({
    example: 'Um hacker descobre a verdade sobre a realidade',
    description: 'Sinopse do filme',
  })
  @IsString()
  @IsNotEmpty()
  plot: string

  @ApiProperty({
    example: 'Filme de ação e ficção científica',
    description: 'Subtítulo do filme',
  })
  @IsString()
  @IsNotEmpty()
  subTitle: string

  @ApiProperty({
    example: '1999-03-31',
    description: 'Data de lançamento',
  })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: string

  @ApiProperty({ example: 8160, description: 'Duração em segundos' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  runtimeSeconds: number

  @ApiProperty({
    example: 'classification-id',
    description: 'ID da classificação indicativa',
  })
  @IsString()
  @IsNotEmpty()
  classificationId: string

  @ApiProperty({
    example: 'situation-id',
    description: 'ID da situação do filme',
  })
  @IsString()
  @IsNotEmpty()
  situationId: string

  @ApiProperty({
    example: 'https://youtube.com/watch?v=...',
    description: 'URL do trailer',
  })
  @IsString()
  @IsNotEmpty()
  trailerUrl: string

  @ApiProperty({ example: 63000000, description: 'Orçamento' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  budget: number

  @ApiProperty({ example: 467200000, description: 'Receita' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  revenue: number

  @ApiProperty({
    example: ['lang-id-1', 'lang-id-2'],
    description: 'IDs dos idiomas',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  languageIds: string[]

  @ApiProperty({
    example: ['genre-id-1', 'genre-id-2'],
    description: 'IDs dos gêneros',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genreIds: string[]
}
