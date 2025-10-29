import { Card } from '@/shared/components/atoms/card'
import { Container } from '@/shared/components/atoms/container'
import { LoginForm } from './components'

export default function LoginFeature() {
  return (
    <Container className="flex h-full items-center justify-center p-0">
      <Card.Root className="z-10 w-[90%] max-w-[412px] rounded-sm bg-mauve-300">
        <Card.Content className="flex flex-col gap-4 p-4">
          <LoginForm />
        </Card.Content>
      </Card.Root>
    </Container>
  )
}
