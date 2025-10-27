import { Button } from '@/shared/components/atoms/button'
import { Container } from '@/shared/components/atoms/container'
import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { Genre, MovieDetails } from '../types/movie-types'
import React from 'react'
import { cn, formatCurrency, runtimeSecondsToHours } from '@/shared/utils/utils'
import { RatingCircleGraph } from './rating-circle-graph'
import { InfoCard } from './info-card'
import { SinopseCard } from './sinopse-card'

export type MovieDetailsDataSectionProps = {
  movie: MovieDetails
}

export const MovieDetailsDataSection = ({
  movie,
}: MovieDetailsDataSectionProps) => {
  return (
    <Container className="relative w-full overflow-hidden p-0 min-[540px]:p-8">
      {/* Background Image */}
      <Container
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${movie.secondaryImage.url})`,
        }}
      />

      {/* Overlay gradient */}
      <Container className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/85 to-black/40" />

      {/* Content */}
      <Container className="relative gap-4 min-[540px]:p-6">
        <DetailsMovieImage
          movie={movie}
          className="block w-full min-[940px]:hidden"
        />

        <DetailsDataSectionHeader
          title={movie.primaryTitle}
          originalTitle={movie.primaryTitle}
        />

        <DetailsDataSectionContent movie={movie} />
      </Container>
    </Container>
  )
}

type DetailsDataSectionHeaderProps = {
  title: string
  originalTitle: string
}

const DetailsDataSectionHeader = ({
  title,
  originalTitle,
}: DetailsDataSectionHeaderProps) => {
  return (
    <HStack className="flex-col-reverse justify-between gap-2 min-[540px]:flex-row">
      <VStack className="w-full items-center min-[540px]:items-start">
        <Typography
          variant="h2"
          className="text-[32px] font-semibold"
          font="montserrat"
        >
          {title}
        </Typography>
        <Typography variant="span" font="montserrat">
          Título Original: {originalTitle}
        </Typography>
      </VStack>

      <HStack className="my-auto gap-4">
        <Button variant="secondary">Deletar</Button>
        <Button className="w-full min-[540px]:w-auto">Editar</Button>
      </HStack>
    </HStack>
  )
}

const DetailsDataSectionContent = ({ movie }: { movie: MovieDetails }) => {
  return (
    <HStack className="gap-4">
      <DetailsMovieImage movie={movie} className="hidden min-[940px]:block" />
      <VStack className="gap-4">
        <HStack className="flex-col-reverse items-center gap-4 min-[1145px]:flex-row">
          <VStack className="w-full items-center p-0 min-[1145px]:w-1/2 min-[1145px]:items-start min-[1145px]:p-4">
            <Typography variant="p" font="montserrat" className="italic">
              {movie.effectPhrase}
            </Typography>
          </VStack>

          <DetailsUserStatistics movie={movie} />
        </HStack>

        <DetailsMovieInfos movie={movie} />
      </VStack>
    </HStack>
  )
}

const DetailsMovieImage = ({
  movie,
  className,
}: {
  movie: MovieDetails
  className: string
}) => {
  return (
    <img
      src={movie.primaryImage.url}
      alt={movie.primaryTitle}
      className={cn(
        'hidden h-[572px] w-[374px] rounded-sm object-cover min-[940px]:block',
        className
      )}
    />
  )
}

const DetailsUserStatistics = ({ movie }: { movie: MovieDetails }) => {
  return (
    <HStack className="h-20 w-full flex-row items-center gap-4 min-[540px]:h-auto min-[1145px]:w-1/2 min-[1145px]:flex-col-reverse min-[1300px]:flex-row">
      <HStack className="w-full items-center gap-4 min-[540px]:w-full min-[1300px]:w-auto">
        <InfoCard
          title="Classificação Indicativa"
          value={`${movie.classification} anos`}
          className="w-full min-[1300px]:w-auto"
        />

        <InfoCard
          className="w-auto"
          title="Votos"
          value={movie.rating.voteCount.toString()}
        />
      </HStack>

      <VStack className="-ml-7 scale-[0.6] rounded-full bg-black/20 backdrop-blur-sm min-[540px]:-ml-3 min-[1145px]:scale-75">
        <RatingCircleGraph rating={movie.rating.aggregateRating} />
      </VStack>
    </HStack>
  )
}

const DetailsMovieInfos = ({ movie }: { movie: MovieDetails }) => {
  return (
    <HStack className="flex-col gap-4 min-[1145px]:flex-row">
      <VStack className="w-full gap-4 min-[1145px]:w-1/2">
        <SinopseCard title="Sinopse" value={movie.plot} className="w-full" />

        <GenresCard title="Gêneros" genres={movie.genres} />
      </VStack>

      <VStack className="w-full gap-4 min-[1145px]:w-1/2">
        <HStack className="gap-4">
          <InfoCard
            title="Lançamento"
            className="w-1/2"
            value={new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
          />

          <InfoCard
            title="Duração"
            className="w-1/2"
            value={runtimeSecondsToHours(movie.runtimeSeconds)}
          />
        </HStack>

        <HStack className="gap-4">
          <InfoCard
            title="Situação"
            className="w-1/2"
            value={movie.situation}
          />

          <InfoCard
            title="Idioma"
            className="w-1/2"
            value={movie.language.name}
          />
        </HStack>

        <HStack className="gap-4">
          <InfoCard
            title="Orçamento"
            className="w-1/2"
            value={formatCurrency(movie.budget)}
          />

          <InfoCard
            title="Receita"
            className="w-1/2"
            value={formatCurrency(movie.revenue)}
          />

          <InfoCard
            title="Lucro"
            className="w-1/2"
            value={formatCurrency(movie.profit)}
          />
        </HStack>
      </VStack>
    </HStack>
  )
}

export const GenresCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    genres: Genre[]
  }
>(({ title, className, genres, ...props }, ref) => (
  <VStack
    ref={ref}
    className={cn(
      'min-w-[80px] gap-2 truncate rounded-sm bg-mauve-400/30 p-4 backdrop-blur-sm',
      className
    )}
    {...props}
  >
    <Typography
      variant="h3"
      font="montserrat"
      className="truncate text-xs font-bold uppercase text-mauve-1100"
    >
      {title}
    </Typography>
    <HStack className="flex-wrap gap-2">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="rounded-sm bg-purple-400/30 p-2 text-purple-1200 backdrop-blur-sm"
        >
          {genre.name}
        </div>
      ))}
    </HStack>
  </VStack>
))
