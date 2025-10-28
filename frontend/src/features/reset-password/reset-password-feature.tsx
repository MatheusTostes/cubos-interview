import { Card } from '@/shared/components/atoms/card'
import { Typography } from '@/shared/components/atoms/typography'
import { ResetPasswordForm, ResetPasswordActions } from './components'
import { useResetPassword } from './hooks/useResetPassword'

interface ResetPasswordFeatureProps {
  token: string
}

export default function ResetPasswordFeature({ token }: ResetPasswordFeatureProps) {
  const resetPasswordMutation = useResetPassword()

  return (
    <Card.Root className="w-full max-w-md">
      <Card.Header className="text-center">
        <Typography variant="h2" className="mb-2">
          Redefinir Senha
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Digite sua nova senha
        </Typography>
      </Card.Header>

      <Card.Content>
        <ResetPasswordForm token={token} />
        <div className="mt-4">
          <ResetPasswordActions isLoading={resetPasswordMutation.isPending} />
        </div>
      </Card.Content>
    </Card.Root>
  )
}

