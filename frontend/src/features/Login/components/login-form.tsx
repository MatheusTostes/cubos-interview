import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'
import { useLogin } from '../hooks/useLogin'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const loginMutation = useLogin()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync({
        identifier: data.nameOrEmail,
        password: data.password,
      })
    } catch (error: any) {
      setError('root', {
        message: error.message || 'Erro ao fazer login',
      })
    }
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
          disabled={loginMutation.isPending}
        />
      </Input.Root>

      <Input.Root error={errors.password?.message}>
        <Input.Label>Senha</Input.Label>
        <Input.Field
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
          disabled={loginMutation.isPending}
        />
      </Input.Root>

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
    </form>
  )
}
