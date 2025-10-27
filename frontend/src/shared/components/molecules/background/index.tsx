import { useState, useEffect } from 'react'
import { useTheme } from '@/shared/hooks'
import { cn } from '@/shared/utils'

export const Background = ({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => {
  const { theme } = useTheme()
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Preload da imagem de background
    const img = new Image()
    img.src = '/login-background.png'
    img.onload = () => setImageLoaded(true)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat',
        theme === 'light' && 'opacity-20 grayscale-[0.9] saturate-[0.05]',
        theme === 'dark' && 'opacity-100 grayscale-[0.2] saturate-[0.15]',
        className
      )}
      style={{
        backgroundImage: imageLoaded
          ? "url('/login-background.png')"
          : undefined,
      }}
      {...props}
    >
      {/* Placeholder enquanto carrega - cor depende do tema */}
      {!imageLoaded && (
        <div
          className={cn(
            'absolute inset-0',
            theme === 'dark' ? 'bg-black' : 'bg-white'
          )}
        />
      )}

      {/* Overlay gradient */}
      <div className="light:from-white light:to-slate-200 h-full w-full bg-gradient-to-b dark:from-black/60 dark:to-black"></div>
    </div>
  )
}
