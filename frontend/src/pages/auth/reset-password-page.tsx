import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ResetPasswordFeature from '@/features/reset-password/reset-password-feature'
import { Container } from '@/shared/components/atoms/container'
import { ROUTES } from '@/shared/constants'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    // Se não houver token, redireciona para login
    if (!token) {
      navigate(ROUTES.AUTH.LOGIN, { replace: true })
    }
  }, [token, navigate])

  // Se não houver token, não renderiza nada (vai redirecionar)
  if (!token) {
    return null
  }

  return (
    <Container className="flex h-full items-center justify-center">
      <ResetPasswordFeature token={token} />
    </Container>
  )
}
