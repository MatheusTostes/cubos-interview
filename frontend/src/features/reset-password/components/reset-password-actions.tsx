import { Button } from '@/shared/components/atoms/button'

interface ResetPasswordActionsProps {
  isLoading: boolean
}

export const ResetPasswordActions = ({
  isLoading,
}: ResetPasswordActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        type="submit"
        form="reset-password-form"
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading ? 'Alterando senha...' : 'Alterar senha'}
      </Button>
    </div>
  )
}

