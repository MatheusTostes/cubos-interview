import { Button } from '@/shared/components/atoms/button'
import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'
import { useAuth, useNavigation } from '@/shared/hooks'

export const LoginActions = () => {
  const { goToRegister } = useNavigation()
  const { isLoading } = useAuth()

  return (
    <VStack className="gap-2">
      <HStack className="mt-2 flex-col-reverse justify-between gap-2 sm:mt-0 sm:flex-row">
        <Button variant="link" className="p-[2px]" disabled={isLoading}>
          Esqueci minha senha
        </Button>
        <Button form="login-form" isLoading={isLoading}>
          Entrar
        </Button>
      </HStack>

      <HStack className="mx-auto items-center text-center">
        <Typography variant="p" className="text-sm text-muted-foreground">
          Ainda não tem uma conta?
        </Typography>
        <Button
          variant="link"
          className="p-[2px] text-sm"
          onClick={goToRegister}
          disabled={isLoading}
        >
          Cadastre-se
        </Button>
      </HStack>
    </VStack>
  )
}
