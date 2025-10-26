import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema'
import { useAuth } from '@/shared/hooks/useAuth'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { register: registerUser } = useAuth()

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data)
  }

  return (
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
        />
      </Input.Root>

      <Input.Root error={errors.email?.message}>
        <Input.Label>E-mail</Input.Label>
        <Input.Field
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
      </Input.Root>

      <Input.Root error={errors.password?.message}>
        <Input.Label>Senha</Input.Label>
        <Input.Field
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
        />
      </Input.Root>

      <Input.Root error={errors.confirmPassword?.message}>
        <Input.Label>Confirmar Senha</Input.Label>
        <Input.Field
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
        />
      </Input.Root>
    </form>
  )
}
