import LoginFeature from '@/features/login/login-feature'
import { Container } from '@/shared/components/atoms/container'

export default function LoginPage() {
  return (
    <Container className="flex h-full items-center justify-center">
      <LoginFeature />
    </Container>
  )
}
