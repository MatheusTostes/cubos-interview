import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'
import { Button } from '@/shared/components/atoms/button'
import { useNavigation } from '@/shared/hooks'

export const RegisterActions = () => {
  const { goToLogin } = useNavigation()

  return (
    <>
      <HStack className="w-full flex-col-reverse items-center justify-between gap-2 sm:flex-row">
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

        <Button
          type="submit"
          form="register-form"
          className="w-full sm:ml-auto sm:w-auto"
        >
          Cadastrar
        </Button>
      </HStack>
    </>
  )
}
