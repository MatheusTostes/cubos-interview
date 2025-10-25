import React from 'react'
import { Button } from '@/shared/components/atoms/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks/useTheme'
import { Typography } from '@/shared/components/atoms/typography'
import { HStack } from '../../atoms/hstack'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import { cn } from '@/shared/utils'
import { useAuth } from '@/shared/hooks/useAuth'

export const Header: React.FC = () => {
  const { logout } = useAuth()

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex justify-between border-b border-b-white/20 bg-[var(--mauve-100-50)] bg-opacity-80 p-4 backdrop-blur-sm after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:blur-sm">
      <HeaderLogo />
      <HStack className="gap-2">
        <ThemeToggle />
        <Button className="px-4 md:px-5" onClick={logout}>
          Logout
        </Button>
      </HStack>
    </header>
  )
}

const HeaderLogo = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleClick = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <HStack className="cursor-pointer items-center gap-3" onClick={handleClick}>
      <HStack className="w-10 overflow-hidden md:w-[160px]">
        <img
          src="/cubos-logo.svg"
          alt="Logo"
          className={cn('min-w-[160px]', theme === 'light' && 'invert')}
        />
      </HStack>
      <Typography variant="h3">Movies</Typography>
    </HStack>
  )
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="outline" className="px-4 md:px-5" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className="size-4 md:size-5" />
      ) : (
        <Moon className="size-4 md:size-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
