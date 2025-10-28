import { Button } from '@/shared/components/atoms/button'
import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'
import { useNavigate } from 'react-router-dom'

interface ForgotPasswordActionsProps {
  isLoading?: boolean
}

export const ForgotPasswordActions = ({
  isLoading = false,
}: ForgotPasswordActionsProps) => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <VStack className="gap-2">
      <HStack className="mt-2 flex-col-reverse justify-between gap-2 sm:mt-0 sm:flex-row">
        <Button
          variant="link"
          className="p-[2px]"
          disabled={isLoading}
          onClick={goToLogin}
        >
          Voltar
        </Button>
        <Button form="forgot-password-form" isLoading={isLoading}>
          Enviar
        </Button>
      </HStack>

      <HStack className="mx-auto text-center">
        <Typography variant="p" className="text-sm text-muted-foreground">
          Lembrou sua senha?
        </Typography>
        <Button
          variant="link"
          className="p-[2px] text-sm"
          onClick={goToLogin}
          disabled={isLoading}
        >
          Fazer login
        </Button>
      </HStack>
    </VStack>
  )
}
