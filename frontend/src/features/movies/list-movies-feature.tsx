import { Container } from '@/shared/components/atoms/container'
import { movieMocks } from './mocks/movie-mocks'
import { MovieCard } from './components/movie-card'
import { HStack } from '@/shared/components/atoms/hstack'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { FiltersDialog } from './components/filters-dialog'
import { DebounceInput } from '@/shared/components/molecules/debounce-input'
import { useUrlParams } from '@/shared/hooks'
import { Pagination } from '@/shared/components/molecules/pagination'

export default function ListMoviesFeature() {
  const { params, updateParams } = useUrlParams()

  const searchValue = params.search || ''

  const handleSearchChange = (value: string) => {
    updateParams({ search: value })
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

      <MoviesPagination totalPages={5} />
    </>
  )
}

type MoviesPaginationProps = {
  totalPages: number
}

const MoviesPagination = ({ totalPages }: MoviesPaginationProps) => {
  const { params, updateParams } = useUrlParams()

  // Get page number from URL, default to 1
  const pageNumber = params?.page
    ? Math.max(1, Math.min(totalPages, Number(params.page)))
    : 1

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateParams({ page: page.toString() })
    }
  }

  return (
    <Pagination.Root>
      <Pagination.PreviousButton
        onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
        disabled={pageNumber <= 1}
      />
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1
        const isActive = pageNum === pageNumber

        return (
          <Pagination.PageButton
            key={index}
            pageNumber={pageNum}
            isActive={isActive}
            onClick={() => handlePageChange(pageNum)}
          />
        )
      })}
      <Pagination.NextButton
        onClick={() => handlePageChange(Math.min(totalPages, pageNumber + 1))}
        disabled={pageNumber >= totalPages}
      />
    </Pagination.Root>
  )
}
