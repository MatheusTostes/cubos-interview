import { z } from 'zod'

export const loginSchema = z.object({
  nameOrEmail: z.string().min(1, 'Nome/E-mail é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type LoginFormData = z.infer<typeof loginSchema>
