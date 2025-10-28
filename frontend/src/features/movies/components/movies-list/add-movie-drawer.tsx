import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Button } from '@/shared/components/atoms/button'
import { Drawer } from '@/shared/components/atoms/drawer'
import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { VStack } from '@/shared/components/atoms/vstack'
import { Input } from '@/shared/components/atoms/input'
import { MediaUpload } from '@/shared/components/molecules/media-upload'
import { X, Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/shared/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/atoms/popover'
import { Calendar } from '@/shared/components/atoms/calendar'
import { addMovieSchema } from '../../schemas/add-movie.schema'
import { useGenres } from '@/features/genres'
import { useClassifications } from '@/features/classifications'
import { useSituations } from '@/features/situations'
import { useLanguages } from '@/features/languages'

export type AddMovieDrawerProps = {
  initialData?: any
  mode?: 'create' | 'edit'
  disabled?: boolean
}

export const AddMovieDrawer = ({
  initialData,
  mode = 'create',
  disabled,
}: AddMovieDrawerProps) => {
  const queryClient = useQueryClient()
  const { data: genresData = [] } = useGenres()
  const { data: classificationsData = [] } = useClassifications()
  const { data: situationsData = [] } = useSituations()
  const { data: languagesData = [] } = useLanguages()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
      languageId: '',
    },
  })

  const selectedGenres = watch('genreIds') || []

  // Popular o formulário quando initialData for fornecido (modo edit)
  useEffect(() => {
    if (initialData && mode === 'edit') {
      // Calcular horas e minutos a partir de runtimeSeconds
      const runtimeSeconds = initialData.runtimeSeconds || 0
      const hours = Math.floor(runtimeSeconds / 3600)
      const minutes = Math.floor((runtimeSeconds % 3600) / 60)

      // Reset form with all values
      reset({
        primaryTitle: initialData.primaryTitle,
        originalTitle: initialData.originalTitle,
        primaryImageUrl: initialData.primaryImageUrl,
        secondaryImageUrl: initialData.secondaryImageUrl,
        plot: initialData.plot,
        subTitle: initialData.subTitle,
        releaseDate: initialData.releaseDate,
        runtimeHours: hours.toString(),
        runtimeMinutes: minutes.toString(),
        classificationId:
          initialData.classification?.id ||
          initialData.classificationObj?.id ||
          initialData.classificationId ||
          '',
        situationId:
          (initialData.situation as any)?.id ||
          initialData.situationObj?.id ||
          initialData.situationId ||
          '',
        genreIds: Array.isArray(initialData.genres)
          ? initialData.genres.map((g: any) => g.genre?.id || g.id || g)
          : initialData.genreIds || [],
        languageId:
          (initialData.language as any)?.id ||
          initialData.languageObj?.id ||
          initialData.languageId ||
          '',
        aggregateRating: initialData.aggregateRating?.toString() || '0',
        voteCount: initialData.voteCount?.toString() || '0',
        budget:
          initialData.budget?.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0,00',
        revenue:
          initialData.revenue?.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0,00',
        trailerUrl: initialData.trailerUrl,
      })

      // Atualizar data do calendário
      // Subtrair 3h da data do backend para mostrar corretamente no date picker local
      if (initialData.releaseDate) {
        const backendDate = new Date(initialData.releaseDate)
        backendDate.setHours(backendDate.getHours() - 3)
        setDate(backendDate)
      }
    }
  }, [initialData, mode, reset])

  // Atualizar o campo hidden quando a data mudar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      // Adicionar 3 horas para compensar o timezone do Brasil (UTC-3)
      // Assim, quando o backend salvar como UTC 00:00, ao converter para local vai manter a data correta
      const dateWithOffset = new Date(selectedDate)
      dateWithOffset.setHours(selectedDate.getHours() + 3)

      // Formatar como ISO string para enviar ao backend
      setValue('releaseDate', dateWithOffset.toISOString())
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
    setIsLoading(true)
    try {
      // Converter horas e minutos para segundos
      const hoursInSeconds = Number(data.runtimeHours) * 3600
      const minutesInSeconds = Number(data.runtimeMinutes) * 60
      const totalSeconds = hoursInSeconds + minutesInSeconds

      // Criar FormData para enviar arquivos
      const formData = new FormData()

      // Adicionar as imagens
      const primaryImageFile = watch('primaryImageFile')
      const secondaryImageFile = watch('secondaryImageFile')

      if (primaryImageFile) {
        formData.append('images', primaryImageFile)
      }
      if (secondaryImageFile) {
        formData.append('images', secondaryImageFile)
      }

      // Adicionar os dados do filme como strings JSON
      formData.append('primaryTitle', data.primaryTitle)
      formData.append('originalTitle', data.originalTitle)
      formData.append('primaryImageUrl', '') // Placeholder, será substituído
      formData.append('secondaryImageUrl', '') // Placeholder, será substituído
      formData.append('plot', data.plot)
      formData.append('subTitle', data.subTitle)
      formData.append('releaseDate', data.releaseDate)
      formData.append('runtimeSeconds', totalSeconds.toString())
      formData.append('trailerUrl', data.trailerUrl)
      formData.append('budget', parseCurrency(data.budget).toString())
      formData.append('revenue', parseCurrency(data.revenue).toString())
      formData.append('classificationId', data.classificationId)
      formData.append('situationId', data.situationId)
      formData.append('genreIds', JSON.stringify(data.genreIds))
      formData.append('languageId', data.languageId)
      formData.append('aggregateRating', data.aggregateRating)
      formData.append('voteCount', data.voteCount)

      const { api } = await import('@/shared/services/api')

      if (mode === 'edit' && initialData?.id) {
        // Atualizar filme existente
        await api.patch(`/movies/${initialData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success('Filme atualizado com sucesso!')

        // Invalidar queries de detalhes e listagem
        queryClient.invalidateQueries({ queryKey: ['movies'] })
        queryClient.invalidateQueries({ queryKey: ['movie', initialData.id] })
      } else {
        // Criar novo filme
        await api.post('/movies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success('Filme criado com sucesso!')

        // Invalidar queries de listagem
        queryClient.invalidateQueries({ queryKey: ['movies'] })
      }

      // Resetar form e fechar drawer
      reset()
      setOpen(false)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao salvar o filme'
      toast.error(message)
      console.error('Error saving movie:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button disabled={disabled} className="w-full min-[540px]:w-auto">
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
              <Drawer.Close asChild>
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

            <MediaUpload
              label="Imagem Principal"
              accept="image/*"
              error={errors.primaryImageUrl?.message as string}
              initialUrl={watch('primaryImageUrl')}
              onFileSelect={(file) => setValue('primaryImageFile', file)}
            />

            <MediaUpload
              label="Imagem Secundária"
              accept="image/*"
              error={errors.secondaryImageUrl?.message as string}
              initialUrl={watch('secondaryImageUrl')}
              onFileSelect={(file) => setValue('secondaryImageFile', file)}
            />

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
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear() + 10}
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
                {classificationsData.map((classification) => (
                  <option key={classification.id} value={classification.id}>
                    {classification.name}
                  </option>
                ))}
              </Input.Select>
            </Input.Root>

            <Input.Root error={errors.situationId?.message as string}>
              <Input.Label required>Situação</Input.Label>
              <Input.Select {...register('situationId')}>
                <option value="">Selecione</option>
                {situationsData.map((situation) => (
                  <option key={situation.id} value={situation.id}>
                    {situation.name}
                  </option>
                ))}
              </Input.Select>
            </Input.Root>

            <Input.Root error={errors.genreIds?.message as string}>
              <VStack className="gap-2">
                <Input.Label required>Gêneros</Input.Label>
                <div className="flex min-h-[60px] flex-wrap gap-2 rounded-sm border border-mauve-600 bg-background p-3">
                  {selectedGenres.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedGenres.map((genreId: string) => {
                        const genre = genresData.find((g) => g.id === genreId)
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
                  {genresData.map((genre) => {
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

            <Input.Root error={errors.languageId?.message as string}>
              <Input.Label required>Idioma</Input.Label>
              <Input.Select {...register('languageId')}>
                <option value="">Selecione</option>
                {languagesData.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </Input.Select>
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
              <Drawer.Close asChild>
                <Button type="button" variant="secondary" disabled={isLoading}>
                  <Typography font="roboto" variant="p">
                    Cancelar
                  </Typography>
                </Button>
              </Drawer.Close>
              <Button type="submit" isLoading={isLoading}>
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
