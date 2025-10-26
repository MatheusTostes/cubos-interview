import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { Button } from '@/shared/components/atoms/button'
import { useAuth, useNavigation } from '@/shared/hooks'

export const RegisterActions = () => {
  const { goToLogin } = useNavigation()
  const { isLoading } = useAuth()

  return (
    <>
      <HStack className="w-full flex-col-reverse items-center justify-between gap-2 sm:flex-row">
        <Typography variant="p" className="text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Button
            variant="link"
            onClick={goToLogin}
            className="h-auto p-0 font-normal"
            disabled={isLoading}
          >
            Faça login
          </Button>
        </Typography>

        <Button
          type="submit"
          form="register-form"
          className="w-full sm:ml-auto sm:w-auto"
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
      </HStack>
    </>
  )
}
