import { Card } from '@/shared/components/atoms/card'
import { Container } from '@/shared/components/atoms/container'
import { LoginForm } from './components'
import { LoginActions } from './components/login-actions'

export default function LoginFeature() {
  return (
    <Container className="flex h-full items-center justify-center p-0">
      <Card.Root className="z-10 w-[90%] max-w-[412px] rounded-sm bg-mauve-300">
        <Card.Content className="flex flex-col gap-4 p-4">
          <LoginForm />
          <LoginActions />
        </Card.Content>
      </Card.Root>
    </Container>
  )
}
