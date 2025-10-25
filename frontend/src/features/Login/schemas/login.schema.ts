import { z } from 'zod'

export const loginSchema = z.object({
  nameOrEmail: z.string().min(1, 'Nome/E-mail é obrigatório'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
