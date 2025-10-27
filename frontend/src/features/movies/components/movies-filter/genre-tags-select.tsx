import { Button } from '@/shared/components/atoms/button'
import { Input } from '@/shared/components/atoms/input'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { type Genre } from '@/features/genres'

export type GenreTagsSelectProps = {
  genres: Genre[]
  selectedGenres: Genre[]
  handleToggleGenre: (genre: Genre) => void
  isLoading?: boolean
}

export const GenreTagsSelect = ({
  genres,
  selectedGenres,
  handleToggleGenre,
  isLoading,
}: GenreTagsSelectProps) => {
  return (
    <Input.Root>
      <VStack className="gap-2">
        <Input.Label>Gênero</Input.Label>
        <div className="flex min-h-[60px] flex-wrap gap-2 rounded-sm border border-mauve-600 bg-background p-3">
          {selectedGenres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleToggleGenre(genre)}
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/80"
                >
                  <Typography variant="small" font="roboto">
                    {genre.name}
                  </Typography>
                  <span className="text-xs">×</span>
                </button>
              ))}
            </div>
          ) : (
            <Typography variant="small" className="text-muted-foreground">
              Selecione um ou mais gêneros
            </Typography>
          )}
        </div>

        <div className="grid h-[120px] grid-cols-2 gap-2 overflow-y-auto">
          {isLoading ? (
            <Typography variant="small" className="text-muted-foreground">
              Carregando gêneros...
            </Typography>
          ) : (
            genres.map((genre) => {
              const isSelected = selectedGenres.some((g) => g.id === genre.id)
              return (
                <Button
                  key={genre.id}
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => handleToggleGenre(genre)}
                  className="justify-start"
                >
                  <Typography variant="small" font="roboto">
                    {genre.name}
                  </Typography>
                </Button>
              )
            })
          )}
        </div>
      </VStack>
    </Input.Root>
  )
}
