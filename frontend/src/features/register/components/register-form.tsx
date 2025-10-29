import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema'
import { useRegister } from '../hooks/useRegister'
import { RegisterActions } from './register-actions'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const registerMutation = useRegister()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    } catch (error: any) {
      setError('root', {
        message: error.message || 'Erro ao registrar',
      })
    }
  }

  return (
    <>
      <form
        id="register-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <Input.Root error={errors.name?.message}>
          <Input.Label>Nome</Input.Label>
          <Input.Field
            type="text"
            placeholder="Digite seu nome"
            {...register('name')}
            disabled={registerMutation.isPending}
          />
        </Input.Root>

        <Input.Root error={errors.email?.message}>
          <Input.Label>E-mail</Input.Label>
          <Input.Field
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            disabled={registerMutation.isPending}
          />
        </Input.Root>

        <Input.Root error={errors.password?.message}>
          <Input.Label>Senha</Input.Label>
          <Input.Field
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
            disabled={registerMutation.isPending}
          />
        </Input.Root>

        <Input.Root error={errors.confirmPassword?.message}>
          <Input.Label>Confirmar Senha</Input.Label>
          <Input.Field
            type="password"
            placeholder="Digite sua senha novamente"
            {...register('confirmPassword')}
            disabled={registerMutation.isPending}
          />
        </Input.Root>

        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}
      </form>
      <RegisterActions isLoading={registerMutation.isPending} />
    </>
  )
}
