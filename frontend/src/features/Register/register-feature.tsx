import { Card } from '@/shared/components/atoms/card'
import { Typography } from '@/shared/components/atoms/typography'
import { RegisterActions, RegisterForm } from './components'

export default function RegisterFeature() {
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
        <RegisterActions />
      </Card.Footer>
    </Card.Root>
  )
}
