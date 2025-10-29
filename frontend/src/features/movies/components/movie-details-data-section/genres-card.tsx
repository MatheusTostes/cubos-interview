import { VStack } from '@/shared/components/atoms/vstack'
import { Genre } from '@/features/genres'
import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Typography } from '@/shared/components/atoms/typography'
import { HStack } from '@/shared/components/atoms/hstack'

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
