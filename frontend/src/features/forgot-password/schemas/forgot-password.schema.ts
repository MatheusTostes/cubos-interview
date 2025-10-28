import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, 'Email ou nome de usuário é obrigatório'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
