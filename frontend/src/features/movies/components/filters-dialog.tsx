import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog } from '@/shared/components/atoms/dialog'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { DurationInputSlider } from './duration-input-slider'
import { ReleaseIntervalDateInput } from './release-interval-date-input'
import { GenreTagsSelect } from './genre-tags-select'
import { DateRange } from 'react-day-picker'
import { useUrlParams } from '@/shared/hooks'
import { GENRES, type Genre } from '../types/genre'

interface FiltersDialogProps {
  children: React.ReactNode
}

interface FiltersFormData {
  genres: Genre[]
  durationRange: {
    min: number
    max: number
  }
  dateRange: DateRange | undefined
}

export function FiltersDialog({ children }: FiltersDialogProps) {
  const [open, setOpen] = useState(false)
  const { params, updateParams, clearParams } = useUrlParams()

  // Parse default values from URL
  const getDefaultGenres = (): Genre[] => {
    const genreIds = params.genres?.split(',') || []
    return GENRES.filter((g) => genreIds.includes(g.id))
  }

  const getDefaultDuration = () => {
    const min = params.durationMin ? parseInt(params.durationMin) / 30 : 0
    const max = params.durationMax ? parseInt(params.durationMax) / 30 : 10
    return { min, max }
  }

  const getDefaultDateRange = (): DateRange | undefined => {
    if (params.releaseDateStart && params.releaseDateEnd) {
      return {
        from: new Date(params.releaseDateStart),
        to: new Date(params.releaseDateEnd),
      }
    }
    return undefined
  }

  const { handleSubmit, setValue, watch, reset } = useForm<FiltersFormData>({
    defaultValues: {
      genres: getDefaultGenres(),
      durationRange: getDefaultDuration(),
      dateRange: getDefaultDateRange(),
    },
  })

  // Sync form with URL params on mount
  useEffect(() => {
    setValue('genres', getDefaultGenres())
    setValue('durationRange', getDefaultDuration())
    setValue('dateRange', getDefaultDateRange())
  }, [setValue])

  const durationRange = watch('durationRange')
  const dateRange = watch('dateRange')
  const genres = watch('genres')

  const isFormValid = true

  const handleToggleGenre = (genre: Genre) => {
    const currentGenres = genres || []
    const isSelected = currentGenres.some((g) => g.id === genre.id)
    const newGenres = isSelected
      ? currentGenres.filter((g) => g.id !== genre.id)
      : [...currentGenres, genre]
    setValue('genres', newGenres)
  }

  const onSubmit = (data: FiltersFormData) => {
    // Update URL params - only include non-empty values
    const paramsToUpdate: any = {}

    if (data.genres.length > 0) {
      paramsToUpdate.genres = data.genres.map((g) => g.id).join(',')
    }

    if (data.durationRange.min !== data.durationRange.max) {
      paramsToUpdate.durationMin = (data.durationRange.min * 30).toString()
      paramsToUpdate.durationMax = (data.durationRange.max * 30).toString()
    }

    if (data.dateRange?.from && data.dateRange?.to) {
      paramsToUpdate.releaseDateStart = data.dateRange.from.toISOString()
      paramsToUpdate.releaseDateEnd = data.dateRange.to.toISOString()
    }

    updateParams(paramsToUpdate)
    setOpen(false)
  }

  const handleClearFilters = () => {
    clearParams()
    reset({
      genres: [],
      durationRange: { min: 0, max: 10 },
      dateRange: undefined,
    })
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>
            <Typography
              variant="span"
              font="montserrat"
              className="font-semibold"
            >
              Filtros
            </Typography>
          </Dialog.Title>
          <Dialog.Description>
            <Typography variant="span" className="text-muted-foreground">
              Use os filtros abaixo para refinar sua busca.
            </Typography>
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack className="gap-4 py-4">
            <DurationInputSlider
              durationRange={durationRange}
              setDurationRange={(range) => setValue('durationRange', range)}
            />

            <ReleaseIntervalDateInput
              dateRange={
                dateRange ?? ({ from: undefined, to: undefined } as DateRange)
              }
              setDateRange={(range) => setValue('dateRange', range)}
            />

            <GenreTagsSelect
              selectedGenres={genres}
              handleToggleGenre={handleToggleGenre}
            />
          </VStack>

          <Dialog.Footer className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearFilters}
            >
              <Typography
                onClick={handleClearFilters}
                variant="p"
                font="roboto"
              >
                Limpar
              </Typography>
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              <Typography variant="p" font="roboto">
                Aplicar Filtros
              </Typography>
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
