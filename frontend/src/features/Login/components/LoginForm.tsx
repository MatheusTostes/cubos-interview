import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'
import { useAuth } from '@/shared/hooks/useAuth'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { login } = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    await login(data)
  }

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <Input.Root error={errors.nameOrEmail?.message}>
        <Input.Label>Nome/E-mail</Input.Label>
        <Input.Field
          type="text"
          placeholder="Digite seu nome/E-mail"
          {...register('nameOrEmail')}
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
    </form>
  )
}
