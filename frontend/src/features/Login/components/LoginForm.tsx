import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/atoms/input'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data)
      // Aqui você implementaria a lógica de login
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula API call
    } catch (error) {
      console.error('Login error:', error)
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
