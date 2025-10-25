import React from 'react'
import { Button } from '@/shared/components/atoms/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks/useTheme'
import { Typography } from '@/shared/components/atoms/typography'
import { Container } from '@/shared/components/atoms/container'

export interface IHeader {
  title?: string
}

export const Header: React.FC<IHeader> = ({ title = 'Cubos Interview' }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b bg-background">
      <Container className="bg-mauve-100 flex items-center justify-between">
        <Typography font="display" variant="h1">
          {title}
        </Typography>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </Container>
    </header>
  )
}
