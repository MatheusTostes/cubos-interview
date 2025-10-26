import { Card } from '@/shared/components/atoms/card'
import { Typography } from '@/shared/components/atoms/typography'
import { Button } from '@/shared/components/atoms/button'
import { RegisterForm } from './components'
import { useNavigation } from '@/shared/hooks'
import { HStack } from '@/shared/components/atoms/hstack'

export default function Register() {
  const { goToLogin } = useNavigation()

  return (
    <Card.Root className="w-full max-w-md">
      <Card.Header className="text-center">
        <Typography variant="h2" className="mb-2">
          Criar Conta
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Preencha os dados abaixo para criar sua conta
        </Typography>
      </Card.Header>

      <Card.Content>
        <RegisterForm />
      </Card.Content>

      <Card.Footer className="flex flex-col space-y-4">
        <Button type="submit" form="register-form" className="w-full">
          Cadastrar
        </Button>

        <HStack className="text-center">
          <Typography variant="p" className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Button
              variant="link"
              onClick={goToLogin}
              className="h-auto p-0 font-normal"
            >
              Faça login
            </Button>
          </Typography>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}
