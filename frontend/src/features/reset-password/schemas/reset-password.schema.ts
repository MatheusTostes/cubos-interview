import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem',
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

