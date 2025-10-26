import RegisterFeature from '@/features/register/register-feature'
import { Container } from '@/shared/components/atoms/container'

export default function RegisterPage() {
  return (
    <Container className="flex h-full items-center justify-center">
      <RegisterFeature />
    </Container>
  )
}
