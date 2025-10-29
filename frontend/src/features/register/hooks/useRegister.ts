import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  authService,
  type RegisterRequest,
} from '@/shared/services/auth.service'
import { useAuth } from '@/shared/hooks/useAuth'

export const useRegister = () => {
  const navigate = useNavigate()
  const { setUser, setIsAuthenticated } = useAuth()

  return useMutation({
    mutationFn: (credentials: RegisterRequest) =>
      authService.register(credentials),
    onSuccess: (data) => {
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Conta criada com sucesso!')
      navigate('/movies')
    },
    onError: (error: any) => {
      console.error('Register error:', error)
      const message = error.response?.data?.message || 'Erro ao registrar'
      toast.error(message)
      throw new Error(message)
    },
  })
}
