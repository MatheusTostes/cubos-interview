import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authService } from '@/shared/services/auth.service'
import { ROUTES } from '@/shared/constants'

export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: {
      token: string
      password: string
      confirmPassword: string
    }) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success(
        'Senha alterada com sucesso! Faça login com sua nova senha.'
      )
      navigate(ROUTES.AUTH.LOGIN, { replace: true })
    },
    onError: (error: any) => {
      console.error('Reset password error:', error)
      const message =
        error.response?.data?.message ||
        'Erro ao redefinir senha. Tente novamente.'
      toast.error(message)
    },
  })
}
