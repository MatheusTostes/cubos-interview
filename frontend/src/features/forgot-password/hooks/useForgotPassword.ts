import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { authService } from '@/shared/services/auth.service'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: { identifier: string }) =>
      authService.forgotPassword(data),
    onSuccess: () => {
      // Não faz nada - a feature vai tratar o sucesso
    },
    onError: (error: any) => {
      console.error('Forgot password error:', error)
      const message =
        error.response?.data?.message ||
        'Email ou nome de usuário não cadastrado no sistema'
      toast.error(message)
    },
  })
}
