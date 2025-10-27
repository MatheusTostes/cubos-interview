import { Container } from '@/shared/components/atoms/container'
import { HStack } from '@/shared/components/atoms/hstack'
import { MovieCardSkeleton } from '@/features/movies/components/movies-list/movie-card-skeleton'

export const MoviesListSkeleton = () => {
  return (
    <Container className="p-4">
      <HStack className="w-full flex-col-reverse items-end gap-3 p-4 px-3 min-[540px]:flex-row min-[540px]:px-0">
        <HStack className="w-full max-w-[488px]">
          {/* Skeleton do DebounceInput */}
          <div className="h-10 w-full animate-pulse rounded-sm border border-mauve-600 bg-background">
            <div className="flex h-full items-center px-3">
              <div className="h-4 w-40 rounded-sm bg-mauve-700" />
            </div>
          </div>
        </HStack>

        <HStack className="ml-auto gap-2">
          {/* Botão de filtros */}
          <div className="h-10 w-20 animate-pulse rounded-xs bg-mauve-700" />
          {/* Botão adicionar filme */}
          <div className="h-10 w-32 animate-pulse rounded-xs bg-mauve-700" />
        </HStack>
      </HStack>

      {/* Grid de skeletons */}
      <Container className="grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
      </Container>
    </Container>
  )
}
