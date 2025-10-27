import { HStack } from '@/shared/components/atoms/hstack'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { FiltersDialog } from './components/movies-filter/filters-dialog'
import { DebounceInput } from '@/shared/components/molecules/debounce-input'
import { useUrlParams } from '@/shared/hooks'
import { MoviesPagination } from './components/movies-list/movies-pagination'
import { MovieList } from './components/movies-list'
import { AddMovieDrawer } from './components/movies-list/add-movie-drawer'

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
      <HStack className="w-full flex-col-reverse justify-end gap-3 px-3 min-[540px]:flex-row min-[540px]:px-0">
        <HStack className="w-full max-w-[488px]">
          <DebounceInput
            placeholder="Pesquisar por filmes"
            defaultValue={searchValue}
            onValueChange={handleSearchChange}
            debounceMs={1000}
          />
        </HStack>

        <HStack className="ml-auto gap-2">
          <FiltersDialog>
            <Button variant="secondary">
              <Typography font="roboto" variant="p">
                Filtros
              </Typography>
            </Button>
          </FiltersDialog>

          <AddMovieDrawer />
        </HStack>
      </HStack>

      <MovieList />

      <MoviesPagination totalPages={20} />
    </>
  )
}
