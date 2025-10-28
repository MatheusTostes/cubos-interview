import { Container } from '@/shared/components/atoms/container'

export const AuthPageSkeleton = () => (
  <Container className="flex h-screen items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-900 border-t-transparent" />
    </div>
  </Container>
)
