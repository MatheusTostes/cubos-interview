import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/shared/components/atoms/button'
import { Drawer } from '@/shared/components/atoms/drawer'
import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { Input } from '@/shared/components/atoms/input'
import { X, Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/shared/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/atoms/popover'
import { Calendar } from '@/shared/components/atoms/calendar'
import {
  addMovieSchema,
  type AddMovieFormData,
} from '../../schemas/add-movie.schema'
import { GENRES } from '../../types/genre'

export type AddMovieDrawerProps = {
  initialData?: any
  mode?: 'create' | 'edit'
}

export const AddMovieDrawer = ({
  initialData,
  mode = 'create',
}: AddMovieDrawerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    initialData?.releaseDate ? new Date(initialData.releaseDate) : undefined
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addMovieSchema),
    defaultValues: initialData || {
      genreIds: [],
    },
  })

  const selectedGenres = watch('genreIds') || []

  // Atualizar o campo hidden quando a data mudar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      // Formatar como YYYY-MM-DD para o input date
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      setValue('releaseDate', `${year}-${month}-${day}`)
    }
  }

  // Função para formatar valor como moeda (BRL)
  const formatCurrency = (value: string): string => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, '')
    // Converte para número e formata com vírgula e 2 casas decimais
    const number = parseFloat(numbers) / 100
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Função para fazer parse do valor de moeda para número
  const parseCurrency = (value: string): number => {
    // Remove formatação e converte
    const cleanValue = value.replace(/\./g, '').replace(',', '.')
    return parseFloat(cleanValue) || 0
  }

  // Handlers para os inputs de moeda
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setValue('budget', formatted)
  }

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setValue('revenue', formatted)
  }

  const handleToggleGenre = (genreId: string) => {
    const currentGenres = selectedGenres
    if (currentGenres.includes(genreId)) {
      setValue(
        'genreIds',
        currentGenres.filter((id: string) => id !== genreId)
      )
    } else {
      setValue('genreIds', [...currentGenres, genreId])
    }
  }

  const onSubmit = async (data: any) => {
    // Converter horas e minutos para segundos
    const hoursInSeconds = Number(data.runtimeHours) * 3600
    const minutesInSeconds = Number(data.runtimeMinutes) * 60
    const totalSeconds = hoursInSeconds + minutesInSeconds

    // Mapeamento de situação para ID
    const situationIdMap: Record<string, number> = {
      Lançado: 1,
      'Em Breve': 2,
      'Em Produção': 3,
      Cancelado: 4,
    }

    // Transformar os campos de número de string para number
    const movieData: AddMovieFormData = {
      ...data,
      runtimeSeconds: totalSeconds,
      aggregateRating: Number(data.aggregateRating),
      voteCount: Number(data.voteCount),
      budget: parseCurrency(data.budget),
      revenue: parseCurrency(data.revenue),
      classificationId: Number(data.classificationId),
      situationId: situationIdMap[data.situationId] || 1,
      genreIds: data.genreIds.map((id: string) => Number(id)),
    }

    console.log(
      mode === 'edit' ? 'Updating movie:' : 'Creating movie:',
      movieData
    )
    // TODO: Implementar chamada à API
    reset()
  }

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger>
        <Button>
          <Typography font="roboto" variant="p">
            {mode === 'edit' ? 'Editar' : 'Adicionar Filme'}
          </Typography>
        </Button>
      </Drawer.Trigger>

      <Drawer.Content className="flex w-[90%] flex-col min-[535px]:w-[533px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <Drawer.Header>
            <HStack className="w-full justify-between">
              <Drawer.Title>
                {mode === 'edit' ? 'Editar Filme' : 'Adicionar Filme'}
              </Drawer.Title>
              <Drawer.Close>
                <Button type="button" variant="ghost" className="p-0">
                  <X className="h-4 w-4" />
                </Button>
              </Drawer.Close>
            </HStack>
          </Drawer.Header>

          <VStack className="flex-1 gap-4 overflow-y-auto p-4">
            <Input.Root error={errors.primaryTitle?.message as string}>
              <Input.Label required>Título Principal</Input.Label>
              <Input.Field
                placeholder="Ex: The Matrix"
                {...register('primaryTitle')}
              />
            </Input.Root>

            <Input.Root error={errors.originalTitle?.message as string}>
              <Input.Label required>Título Original</Input.Label>
              <Input.Field
                placeholder="Ex: Matrix"
                {...register('originalTitle')}
              />
            </Input.Root>

            <Input.Root error={errors.primaryImageUrl?.message as string}>
              <Input.Label required>URL da Imagem Principal</Input.Label>
              <Input.Field
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register('primaryImageUrl')}
              />
            </Input.Root>

            <Input.Root error={errors.secondaryImageUrl?.message as string}>
              <Input.Label required>URL da Imagem Secundária</Input.Label>
              <Input.Field
                type="url"
                placeholder="https://example.com/image2.jpg"
                {...register('secondaryImageUrl')}
              />
            </Input.Root>

            <Input.Root error={errors.plot?.message as string}>
              <Input.Label required>Enredo</Input.Label>
              <Input.TextArea
                placeholder="Digite o enredo do filme..."
                rows={4}
                {...register('plot')}
              />
            </Input.Root>

            <Input.Root error={errors.subTitle?.message as string}>
              <Input.Label required>Subtítulo</Input.Label>
              <Input.Field
                placeholder="Ex: O futuro está em suas mãos"
                {...register('subTitle')}
              />
            </Input.Root>

            <Input.Root error={errors.releaseDate?.message as string}>
              <Input.Label required>Data de Lançamento</Input.Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'flex w-full items-center justify-start gap-2 font-normal [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-start [&>div]:gap-2',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {date
                        ? date.toLocaleDateString('pt-BR')
                        : 'Selecione a data'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" {...register('releaseDate')} />
            </Input.Root>

            <HStack className="gap-4">
              <Input.Root error={errors.runtimeHours?.message as string}>
                <Input.Label required>Duração - Horas</Input.Label>
                <Input.Field
                  type="number"
                  placeholder="1"
                  min="0"
                  {...register('runtimeHours')}
                />
              </Input.Root>

              <Input.Root error={errors.runtimeMinutes?.message as string}>
                <Input.Label required>Minutos</Input.Label>
                <Input.Field
                  type="number"
                  placeholder="30"
                  min="0"
                  max="59"
                  {...register('runtimeMinutes')}
                />
              </Input.Root>
            </HStack>

            <Input.Root error={errors.classificationId?.message as string}>
              <Input.Label required>Classificação</Input.Label>
              <Input.Select {...register('classificationId')}>
                <option value="">Selecione</option>
                <option value="L">Livre</option>
                <option value="10">10 anos</option>
                <option value="12">12 anos</option>
                <option value="14">14 anos</option>
                <option value="16">16 anos</option>
                <option value="18">18 anos</option>
              </Input.Select>
            </Input.Root>

            <Input.Root error={errors.situationId?.message as string}>
              <Input.Label required>Situação</Input.Label>
              <Input.Select {...register('situationId')}>
                <option value="">Selecione</option>
                <option value="Lançado">Lançado</option>
                <option value="Em Breve">Em Breve</option>
                <option value="Em Produção">Em Produção</option>
                <option value="Cancelado">Cancelado</option>
              </Input.Select>
            </Input.Root>

            <Input.Root error={errors.genreIds?.message as string}>
              <VStack className="gap-2">
                <Input.Label required>Gêneros</Input.Label>
                <div className="flex min-h-[60px] flex-wrap gap-2 rounded-sm border border-mauve-600 bg-background p-3">
                  {selectedGenres.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedGenres.map((genreId: string) => {
                        const genre = GENRES.find((g) => g.id === genreId)
                        return (
                          <button
                            key={genreId}
                            type="button"
                            onClick={() => handleToggleGenre(genreId)}
                            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/80"
                          >
                            <Typography variant="small" font="roboto">
                              {genre?.name}
                            </Typography>
                            <span className="text-xs">×</span>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Selecione um ou mais gêneros
                    </Typography>
                  )}
                </div>

                <div className="grid h-[120px] grid-cols-2 gap-2 overflow-y-auto">
                  {GENRES.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id)
                    return (
                      <Button
                        key={genre.id}
                        type="button"
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => handleToggleGenre(genre.id)}
                        className="justify-start"
                      >
                        <Typography variant="small" font="roboto">
                          {genre.name}
                        </Typography>
                      </Button>
                    )
                  })}
                </div>
              </VStack>
            </Input.Root>

            <HStack className="gap-4">
              <Input.Root error={errors.aggregateRating?.message as string}>
                <Input.Label required>Nota (0-10)</Input.Label>
                <Input.Field
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="8.5"
                  {...register('aggregateRating')}
                />
              </Input.Root>

              <Input.Root error={errors.voteCount?.message as string}>
                <Input.Label required>Contagem de Votos</Input.Label>
                <Input.Field
                  type="number"
                  placeholder="1250"
                  {...register('voteCount')}
                />
              </Input.Root>
            </HStack>

            <HStack className="gap-4">
              <Input.Root error={errors.budget?.message as string}>
                <Input.Label required>Orçamento ($)</Input.Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input.Field
                    type="text"
                    placeholder="10.000.000,00"
                    className="pl-8"
                    {...register('budget', {
                      onChange: handleBudgetChange,
                    })}
                  />
                </div>
              </Input.Root>

              <Input.Root error={errors.revenue?.message as string}>
                <Input.Label required>Receita ($)</Input.Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input.Field
                    type="text"
                    placeholder="50.000.000,00"
                    className="pl-8"
                    {...register('revenue', {
                      onChange: handleRevenueChange,
                    })}
                  />
                </div>
              </Input.Root>
            </HStack>

            <Input.Root error={errors.trailerUrl?.message as string}>
              <Input.Label required>URL do Trailer</Input.Label>
              <Input.Field
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register('trailerUrl')}
              />
            </Input.Root>
          </VStack>

          <Drawer.Footer className="mt-auto">
            <HStack className="w-full justify-end gap-2">
              <Drawer.Close>
                <Button type="button" variant="secondary">
                  <Typography font="roboto" variant="p">
                    Cancelar
                  </Typography>
                </Button>
              </Drawer.Close>
              <Button type="submit">
                <Typography font="roboto" variant="p">
                  {mode === 'edit' ? 'Salvar Alterações' : 'Adicionar Filme'}
                </Typography>
              </Button>
            </HStack>
          </Drawer.Footer>
        </form>
      </Drawer.Content>
    </Drawer.Root>
  )
}
