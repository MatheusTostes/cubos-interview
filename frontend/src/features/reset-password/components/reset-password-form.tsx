import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../schemas/reset-password.schema'
import { useResetPassword } from '../hooks/useResetPassword'

interface ResetPasswordFormProps {
  token: string
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const resetPasswordMutation = useResetPassword()

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPasswordMutation.mutateAsync({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <form
      id="reset-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input.Root error={errors.password?.message}>
        <Input.Label>Nova Senha</Input.Label>
        <Input.Field
          type="password"
          placeholder="Digite sua nova senha"
          {...register('password')}
          disabled={resetPasswordMutation.isPending}
        />
      </Input.Root>

      <Input.Root error={errors.confirmPassword?.message}>
        <Input.Label>Confirmar Nova Senha</Input.Label>
        <Input.Field
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
          disabled={resetPasswordMutation.isPending}
        />
      </Input.Root>
    </form>
  )
}
