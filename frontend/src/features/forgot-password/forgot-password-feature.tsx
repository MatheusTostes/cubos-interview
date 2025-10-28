import { useState } from 'react'
import { Card } from '@/shared/components/atoms/card'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'
import { Button } from '@/shared/components/atoms/button'
import { VStack } from '@/shared/components/atoms/vstack'
import { ForgotPasswordForm, ForgotPasswordActions } from './components'
import { useForgotPassword } from './hooks/useForgotPassword'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordFeature() {
  const [emailSent, setEmailSent] = useState(false)
  const forgotPasswordMutation = useForgotPassword()
  const navigate = useNavigate()

  const handleSuccess = () => {
    setEmailSent(true)
  }

  const goToLogin = () => {
    navigate('/login')
  }

  if (emailSent) {
    return (
      <Container className="flex h-full items-center justify-center p-0">
        <Card.Root className="z-10 w-[90%] max-w-[412px] rounded-sm bg-mauve-300">
          <Card.Content className="flex flex-col gap-4 p-4">
            <Typography
              variant="h1"
              font="roboto"
              className="text-xl font-semibold"
            >
              Email de recuperação enviado
            </Typography>
            <Typography variant="p" className="text-sm text-muted-foreground">
              Verifique sua caixa de entrada e siga as instruções para redefinir
              sua senha.
            </Typography>
            <VStack className="gap-2">
              <Button onClick={goToLogin}>Voltar para login</Button>
            </VStack>
          </Card.Content>
        </Card.Root>
      </Container>
    )
  }

  return (
    <Container className="flex h-full items-center justify-center p-0">
      <Card.Root className="z-10 w-[90%] max-w-[412px] rounded-sm bg-mauve-300">
        <Card.Content className="flex flex-col gap-4 p-4">
          <Typography
            variant="h1"
            font="roboto"
            className="text-xl font-semibold"
          >
            Esqueci minha senha
          </Typography>
          <Typography variant="p" className="text-sm text-muted-foreground">
            Digite seu email ou nome de usuário e enviaremos um link para
            redefinir sua senha.
          </Typography>
          <ForgotPasswordForm onSuccess={handleSuccess} />
          <ForgotPasswordActions isLoading={forgotPasswordMutation.isPending} />
        </Card.Content>
      </Card.Root>
    </Container>
  )
}
