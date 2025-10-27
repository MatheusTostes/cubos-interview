import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService, type LoginRequest } from '@/shared/services/auth.service'
import { useAuth } from '@/shared/hooks/useAuth'

export const useLogin = () => {
  const navigate = useNavigate()
  const { setUser, setIsAuthenticated } = useAuth()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      setUser(data.user)
      setIsAuthenticated(true)
      navigate('/movies')
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      const message = error.response?.data?.message || 'Erro ao fazer login'
      throw new Error(message)
    },
  })
}
