import { Card } from '@/shared/components/atoms/card'
import { Container } from '@/shared/components/atoms/container'
import { LoginForm } from './components'
import { Button } from '@/shared/components/atoms/button'
import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { useNavigation } from '@/shared/hooks'
import { Typography } from '@/shared/components/atoms/typography'

export default function Login() {
  return (
    <Container className="flex h-full items-center justify-center p-0">
      <Card.Root className="bg-mauve-300 z-10 w-[90%] max-w-[412px] rounded-sm">
        <Card.Content className="flex flex-col gap-4 p-4">
          <LoginForm />
          <LoginActions />
        </Card.Content>
      </Card.Root>
    </Container>
  )
}

const LoginActions = () => {
  const { goToRegister } = useNavigation()

  return (
    <VStack className="gap-2">
      <HStack className="mt-2 flex-col-reverse justify-between gap-2 sm:mt-0 sm:flex-row">
        <Button variant="link" className="p-[2px]">
          Esqueci minha senha
        </Button>
        <Button form="login-form">Entrar</Button>
      </HStack>

      <HStack className="mx-auto items-center text-center">
        <Typography variant="p" className="text-sm text-muted-foreground">
          Ainda não tem uma conta?
        </Typography>
        <Button
          variant="link"
          className="p-[2px] text-sm"
          onClick={goToRegister}
        >
          Cadastre-se
        </Button>
      </HStack>
    </VStack>
  )
}
