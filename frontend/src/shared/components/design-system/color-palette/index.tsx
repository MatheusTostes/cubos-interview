import React from 'react'
import { Card } from '@/shared/components/atoms/card'
import { Typography } from '@/shared/components/atoms/typography'
import { cn } from '@/shared/utils'

interface ColorScaleProps {
  name: string
  colors: {
    [key: string]: string
  }
}

const ColorScale: React.FC<ColorScaleProps> = ({ name, colors }) => {
  return (
    <div className="space-y-4">
      <Typography variant="h3" font="montserrat" className="text-foreground">
        {name}
      </Typography>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Object.entries(colors).map(([shade, color]) => (
          <div key={shade} className="space-y-2">
            <div
              className="h-16 w-full rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <div className="text-center">
              <Typography variant="small" className="text-muted-foreground">
                {shade}
              </Typography>
              <Typography
                variant="small"
                className="font-mono text-muted-foreground"
              >
                {color}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ColorPalette: React.FC = () => {
  const purpleColors = {
    100: 'var(--purple-100)',
    200: 'var(--purple-200)',
    300: 'var(--purple-300)',
    400: 'var(--purple-400)',
    500: 'var(--purple-500)',
    600: 'var(--purple-600)',
    700: 'var(--purple-700)',
    800: 'var(--purple-800)',
    900: 'var(--purple-900)',
    1000: 'var(--purple-1000)',
    1100: 'var(--purple-1100)',
    1200: 'var(--purple-1200)',
  }

  const mauveColors = {
    100: 'var(--mauve-100)',
    200: 'var(--mauve-200)',
    300: 'var(--mauve-300)',
    400: 'var(--mauve-400)',
    500: 'var(--mauve-500)',
    600: 'var(--mauve-600)',
    700: 'var(--mauve-700)',
    800: 'var(--mauve-800)',
    900: 'var(--mauve-900)',
    1000: 'var(--mauve-1000)',
    1100: 'var(--mauve-1100)',
    1200: 'var(--mauve-1200)',
  }

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2 text-center">
        <Typography variant="h1" font="montserrat" className="text-foreground">
          Design System Colors
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Cores extraídas do Figma para o projeto Cubos Interview
        </Typography>
      </div>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Purple Scale</Card.Title>
          <Card.Description>
            Escala de cores roxas para elementos principais e acentos
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <ColorScale name="Purple" colors={purpleColors} />
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Mauve Scale</Card.Title>
          <Card.Description>
            Escala de cores neutras para backgrounds, textos e elementos
            secundários
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <ColorScale name="Mauve" colors={mauveColors} />
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Semantic Colors</Card.Title>
          <Card.Description>
            Cores semânticas que se adaptam automaticamente aos temas claro e
            escuro
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[
              { name: 'Background', class: 'bg-background' },
              { name: 'Foreground', class: 'bg-foreground' },
              { name: 'Primary', class: 'bg-primary' },
              { name: 'Secondary', class: 'bg-secondary' },
              { name: 'Muted', class: 'bg-muted' },
              { name: 'Accent', class: 'bg-accent' },
              { name: 'Card', class: 'bg-card' },
              { name: 'Border', class: 'bg-border' },
            ].map(({ name, class: className }) => (
              <div key={name} className="space-y-2">
                <div
                  className={cn(
                    'h-16 w-full rounded-lg border border-border',
                    className
                  )}
                />
                <Typography
                  variant="small"
                  className="text-center text-muted-foreground"
                >
                  {name}
                </Typography>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Usage Examples</Card.Title>
          <Card.Description>
            Exemplos de como usar as cores nas classes do Tailwind
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div className="space-y-2">
            <Typography variant="h4" className="text-foreground">
              Background Colors
            </Typography>
            <div className="flex flex-wrap gap-2">
              <div className="rounded bg-purple-100 px-3 py-1 text-sm text-purple-1200">
                bg-purple-100
              </div>
              <div className="rounded bg-purple-500 px-3 py-1 text-sm text-white">
                bg-purple-500
              </div>
              <div className="rounded bg-purple-1200 px-3 py-1 text-sm text-white">
                bg-purple-1200
              </div>
              <div className="rounded bg-mauve-200 px-3 py-1 text-sm text-mauve-1200">
                bg-mauve-200
              </div>
              <div className="rounded bg-mauve-800 px-3 py-1 text-sm text-mauve-100">
                bg-mauve-800
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="h4" className="text-foreground">
              Text Colors
            </Typography>
            <div className="space-y-1">
              <p className="text-purple-900">
                Texto roxo médio (text-purple-900)
              </p>
              <p className="text-purple-1200">
                Texto roxo escuro (text-purple-1200)
              </p>
              <p className="text-mauve-600">
                Texto neutro médio (text-mauve-600)
              </p>
              <p className="text-mauve-1200">
                Texto neutro escuro (text-mauve-1200)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="h4" className="text-foreground">
              Border Colors
            </Typography>
            <div className="space-y-2">
              <div className="rounded border-2 border-purple-300 p-2">
                Borda roxa clara (border-purple-300)
              </div>
              <div className="rounded border-2 border-mauve-400 p-2">
                Borda neutra (border-mauve-400)
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  )
}
