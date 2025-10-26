import { Container } from '@/shared/components/atoms/container'
import { movieMocks } from './mocks/movie-mocks'
import { MovieCard } from './components/movie-card'
import { HStack } from '@/shared/components/atoms/hstack'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { FiltersDialog } from './components/filters-dialog'
import { DebounceInput } from '@/shared/components/molecules/debounce-input'
import { useUrlParams } from '@/shared/hooks'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export default function ListMoviesFeature() {
  const { updateParams } = useUrlParams()
  const [searchParams] = useSearchParams()

  const searchValue = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const handleSearchChange = (value: string) => {
    updateParams({ search: value })
  }

  return (
    <>
      <HStack className="w-full items-center justify-end gap-3">
        <div className="w-full max-w-[488px]">
          <DebounceInput
            label=""
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
    </>
  )
}
