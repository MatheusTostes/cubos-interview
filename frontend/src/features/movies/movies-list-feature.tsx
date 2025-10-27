import { Container } from '@/shared/components/atoms/container'
import { movieMocks } from './mocks/movie-mocks'
import { HStack } from '@/shared/components/atoms/hstack'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { FiltersDialog } from './components/movies-filter/filters-dialog'
import { DebounceInput } from '@/shared/components/molecules/debounce-input'
import { useUrlParams } from '@/shared/hooks'
import { MoviesPagination } from './components/movies-list/movies-pagination'
import { MovieCard } from './components/movies-list/movie-card'

export default function MoviesListFeature() {
  const { params, updateParams } = useUrlParams()

  const searchValue = params.search || ''

  const handleSearchChange = (value: string) => {
    // When changing search, remove the page param to reset to page 1
    // Only update if there's an actual search value or if we need to clear an existing search
    if (value || params.search) {
      updateParams({ search: value || undefined }, { removePage: true })
    }
  }

  return (
    <>
      <HStack className="w-full items-center justify-end gap-3">
        <div className="w-full max-w-[488px]">
          <DebounceInput
            placeholder="Pesquisar por filmes"
            defaultValue={searchValue}
            onValueChange={handleSearchChange}
            debounceMs={1000}
          />
        </div>

        <FiltersDialog>
          <Button variant="secondary">
            <Typography font="roboto" variant="p">
              Filtros
            </Typography>
          </Button>
        </FiltersDialog>

        <Button>
          <Typography font="roboto" variant="p">
            Adicionar Filme
          </Typography>
        </Button>
      </HStack>

      <Container className="grid grid-cols-1 gap-4 rounded-sm bg-white/10 p-4 backdrop-blur-[3px] xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movieMocks.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Container>

      <MoviesPagination totalPages={20} />
    </>
  )
}
