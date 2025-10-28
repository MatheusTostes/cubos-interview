import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas/forgot-password.schema'
import { useForgotPassword } from '../hooks/useForgotPassword'

interface ForgotPasswordFormProps {
  onSuccess: () => void
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const forgotPasswordMutation = useForgotPassword()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        identifier: data.identifier,
      })
      onSuccess()
    } catch (error) {
      // Erro já foi tratado no hook
    }
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <Input.Root error={errors.identifier?.message}>
        <Input.Label>Email ou Nome de Usuário</Input.Label>
        <Input.Field
          type="text"
          placeholder="Digite seu email ou nome de usuário"
          {...register('identifier')}
          disabled={forgotPasswordMutation.isPending}
        />
      </Input.Root>
    </form>
  )
}
