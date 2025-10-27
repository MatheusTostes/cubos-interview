import { z } from 'zod'

const situationEnum = z.enum([
  'Lançado',
  'Em Breve',
  'Em Produção',
  'Cancelado',
])

export type AddMovieFormData = {
  primaryTitle: string
  originalTitle: string
  primaryImageUrl: string
  secondaryImageUrl: string
  plot: string
  subTitle: string
  releaseDate: string
  runtimeSeconds: number
  classificationId: number
  situationId: number
  genreIds: number[]
  aggregateRating: number
  voteCount: number
  budget: number
  revenue: number
  trailerUrl: string
}

export const addMovieSchema = z.object({
  primaryTitle: z.string().min(1, 'Título principal é obrigatório'),
  originalTitle: z.string().min(1, 'Título original é obrigatório'),
  primaryImageUrl: z.string().url('URL da imagem principal inválida'),
  secondaryImageUrl: z.string().url('URL da imagem secundária inválida'),
  plot: z.string().min(1, 'Enredo é obrigatório'),
  subTitle: z.string().min(1, 'Subtítulo é obrigatório'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  runtimeHours: z
    .string()
    .min(0, 'Horas é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Horas deve ser um número válido',
    }),
  runtimeMinutes: z
    .string()
    .min(0, 'Minutos é obrigatório')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) < 60,
      {
        message: 'Minutos deve estar entre 0 e 59',
      }
    ),
  classificationId: z.string().min(1, 'Classificação é obrigatória'),
  situationId: z
    .string()
    .refine((val) => situationEnum.safeParse(val).success, {
      message: 'Situação é obrigatória',
    }),
  genreIds: z.array(z.string()).min(1, 'Selecione ao menos um gênero'),
  aggregateRating: z
    .string()
    .min(1, 'Nota é obrigatória')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 10,
      {
        message: 'Nota deve estar entre 0 e 10',
      }
    ),
  voteCount: z
    .string()
    .min(1, 'Contagem de votos é obrigatória')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Contagem de votos deve ser maior ou igual a 0',
    }),
  budget: z
    .string()
    .min(1, 'Orçamento é obrigatório')
    .refine(
      (val) => {
        // Remove formatação e valida se é um número válido
        const cleanValue = val.replace(/\./g, '').replace(',', '.')
        const number = parseFloat(cleanValue)
        return !isNaN(number) && number >= 0
      },
      {
        message: 'Orçamento deve ser um valor válido',
      }
    ),
  revenue: z
    .string()
    .min(1, 'Receita é obrigatória')
    .refine(
      (val) => {
        // Remove formatação e valida se é um número válido
        const cleanValue = val.replace(/\./g, '').replace(',', '.')
        const number = parseFloat(cleanValue)
        return !isNaN(number) && number >= 0
      },
      {
        message: 'Receita deve ser um valor válido',
      }
    ),
  trailerUrl: z.string().url('URL do trailer inválida'),
})
