import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ForgotPasswordFeature from '@/features/forgot-password'
import { Container } from '@/shared/components/atoms/container'
import { useAuth } from '@/shared/hooks'
import { ROUTES } from '@/shared/constants'

export default function ForgotPasswordPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Se o usuário já estiver autenticado, redireciona para /movies
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.PROTECTED.MOVIES.LIST, { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return null
  }

  // Se já estiver autenticado, não renderiza nada (vai redirecionar)
  if (isAuthenticated) {
    return null
  }

  return (
    <Container className="flex h-full items-center justify-center">
      <ForgotPasswordFeature />
    </Container>
  )
}
