import { useState, useCallback, useEffect } from 'react'
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
import { type Genre, useGenres } from '@/features/genres'

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
  const { data: genresData, isLoading: isLoadingGenres } = useGenres()

  const { handleSubmit, setValue, watch, reset } = useForm<FiltersFormData>({
    defaultValues: {
      genres: [],
      durationRange: { min: 0, max: 10 },
      dateRange: undefined,
    },
  })

  const durationRange = watch('durationRange')
  const dateRange = watch('dateRange')
  const genres = watch('genres')

  const isFormValid = true

  // Initialize form values from URL params
  useEffect(() => {
    // Wait for genres to load
    if (!genresData) return

    const initialValues: FiltersFormData = {
      genres: [],
      durationRange: { min: 0, max: 10 },
      dateRange: undefined,
    }

    // Parse genres from URL
    if (params.genres && params.genres.length > 0) {
      const selectedGenres = genresData.filter((genre) =>
        params.genres!.includes(genre.id)
      )
      initialValues.genres = selectedGenres
    }

    // Parse duration from URL
    if (params.durationMin && params.durationMax) {
      const minMinutes = Number(params.durationMin)
      const maxMinutes = Number(params.durationMax)
      initialValues.durationRange = {
        min: Math.floor(minMinutes / 30),
        max: Math.floor(maxMinutes / 30),
      }
    }

    // Parse date range from URL
    if (params.releaseDateStart && params.releaseDateEnd) {
      const from = new Date(params.releaseDateStart)
      const to = new Date(params.releaseDateEnd)
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        initialValues.dateRange = { from, to }
      }
    }

    // Reset form with initial values
    reset(initialValues)
  }, [params, reset, genresData])

  const handleDurationRangeChange = useCallback(
    (range: { min: number; max: number }) => {
      setValue('durationRange', range)
    },
    [setValue]
  )

  const handleDateRangeChange = useCallback(
    (range: DateRange | undefined) => {
      setValue('dateRange', range)
    },
    [setValue]
  )

  const handleToggleGenre = (genre: Genre) => {
    const currentGenres = genres || []
    const isSelected = currentGenres.some((g) => g.id === genre.id)
    const newGenres = isSelected
      ? currentGenres.filter((g) => g.id !== genre.id)
      : [...currentGenres, genre]
    setValue('genres', newGenres)
  }

  const onSubmit = (data: FiltersFormData) => {
    // Update URL params - always include all params to properly clear them when empty
    const paramsToUpdate: any = {}

    // Always include genres (even if empty array) to clear from URL when needed
    paramsToUpdate.genres = data.genres.map((g) => g.id)

    // Duration filter
    if (data.durationRange.min !== data.durationRange.max) {
      paramsToUpdate.durationMin = (data.durationRange.min * 30).toString()
      paramsToUpdate.durationMax = (data.durationRange.max * 30).toString()
    } else {
      // Clear duration filters if range is reset
      paramsToUpdate.durationMin = undefined
      paramsToUpdate.durationMax = undefined
    }

    // Date range filter
    if (data.dateRange?.from && data.dateRange?.to) {
      paramsToUpdate.releaseDateStart = data.dateRange.from.toISOString()
      paramsToUpdate.releaseDateEnd = data.dateRange.to.toISOString()
    } else {
      // Clear date filters if not selected
      paramsToUpdate.releaseDateStart = undefined
      paramsToUpdate.releaseDateEnd = undefined
    }

    // When applying filters, remove the page param to reset to page 1
    updateParams(paramsToUpdate, { removePage: true })
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
              setDurationRange={handleDurationRangeChange}
            />

            <ReleaseIntervalDateInput
              dateRange={
                dateRange ?? ({ from: undefined, to: undefined } as DateRange)
              }
              setDateRange={handleDateRangeChange}
            />

            <GenreTagsSelect
              genres={genresData || []}
              selectedGenres={genres}
              handleToggleGenre={handleToggleGenre}
              isLoading={isLoadingGenres}
            />
          </VStack>

          <Dialog.Footer className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearFilters}
            >
              <Typography variant="p" font="roboto">
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
