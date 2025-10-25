import { useTheme } from '@/shared/hooks'
import { cn } from '@/shared/utils'

export const Background = ({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 h-full w-full bg-[url('/login-background.png')] bg-cover bg-center bg-no-repeat grayscale-[0.2] saturate-[0.15]",
        theme === 'dark' && 'grayscale-[0.2] saturate-[0.15]',
        className
      )}
      {...props}
    >
      <div className="h-full w-full bg-gradient-to-b from-black/70 to-black"></div>
    </div>
  )
}
