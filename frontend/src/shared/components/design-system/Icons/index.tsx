import React from 'react'
import { Card } from '@/shared/components/atoms/card'
import { Typography } from '@/shared/components/atoms/typography'
import { SunIcon } from '@/shared/icons/SunIcon'
import { MoonIcon } from '@/shared/icons/MoonIcon'
import { SearchIcon } from '@/shared/icons/SearchIcon'
import { SettingsIcon } from '@/shared/icons/SettingsIcon'
import { ChevronIcon } from '@/shared/icons/ChevronIcon'

interface IconExampleProps {
  name: string
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
}

const IconExample: React.FC<IconExampleProps> = ({
  name,
  component: IconComponent,
  description,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-4">
        <IconComponent className="h-8 w-8 text-foreground" />
      </div>
      <div className="space-y-1 text-center">
        <Typography variant="small" className="font-medium text-foreground">
          {`${name}: `}
        </Typography>
        <Typography variant="small" className="text-muted-foreground">
          {description}
        </Typography>
      </div>
    </div>
  )
}

const IconSizeExample: React.FC<{
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>
}> = ({ component: IconComponent }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <IconComponent className="h-4 w-4 text-foreground" />
        <Typography variant="small" className="text-muted-foreground">
          w-4 h-4 (16px)
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="h-6 w-6 text-foreground" />
        <Typography variant="small" className="text-muted-foreground">
          w-6 h-6 (24px)
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="h-8 w-8 text-foreground" />
        <Typography variant="small" className="text-muted-foreground">
          w-8 h-8 (32px)
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="h-12 w-12 text-foreground" />
        <Typography variant="small" className="text-muted-foreground">
          w-12 h-12 (48px)
        </Typography>
      </div>
    </div>
  )
}

const IconColorExample: React.FC<{
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>
}> = ({ component: IconComponent }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <IconComponent className="h-6 w-6 text-purple-900" />
        <Typography variant="small" className="text-muted-foreground">
          text-purple-900
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="text-mauve-600 h-6 w-6" />
        <Typography variant="small" className="text-muted-foreground">
          text-mauve-600
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="h-6 w-6 text-destructive" />
        <Typography variant="small" className="text-muted-foreground">
          text-destructive
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <IconComponent className="h-6 w-6 text-muted-foreground" />
        <Typography variant="small" className="text-muted-foreground">
          text-muted-foreground
        </Typography>
      </div>
    </div>
  )
}

export const Icons: React.FC = () => {
  const icons = [
    {
      name: 'SunIcon',
      component: SunIcon,
      description: 'Ícone do sol para alternância de tema claro',
    },
    {
      name: 'MoonIcon',
      component: MoonIcon,
      description: 'Ícone da lua para alternância de tema escuro',
    },
    {
      name: 'SearchIcon',
      component: SearchIcon,
      description: 'Ícone de busca para campos de pesquisa',
    },
    {
      name: 'SettingsIcon',
      component: SettingsIcon,
      description: 'Ícone de configurações para menus de opções',
    },
    {
      name: 'ChevronIcon',
      component: ChevronIcon,
      description: 'Ícone de seta para navegação e expansão',
    },
  ]

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2 text-center">
        <Typography variant="h1" font="display" className="text-foreground">
          Design System Icons
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Biblioteca de ícones SVG para o projeto Cubos Interview
        </Typography>
      </div>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>All Icons</Card.Title>
          <Card.Description>
            Todos os ícones disponíveis no design system
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {icons.map(({ name, component, description }) => (
              <IconExample
                key={name}
                name={name}
                component={component}
                description={description}
              />
            ))}
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Size Variations</Card.Title>
          <Card.Description>
            Exemplos de diferentes tamanhos para os ícones
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {icons.slice(0, 3).map(({ name, component }) => (
              <div key={name} className="space-y-2">
                <Typography variant="h4" className="text-foreground">
                  {name}
                </Typography>
                <IconSizeExample component={component} />
              </div>
            ))}
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Color Variations</Card.Title>
          <Card.Description>
            Exemplos de diferentes cores para os ícones usando as cores do
            design system
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {icons.slice(0, 3).map(({ name, component }) => (
              <div key={name} className="space-y-2">
                <Typography variant="h4" className="text-foreground">
                  {name}
                </Typography>
                <IconColorExample component={component} />
              </div>
            ))}
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Usage Examples</Card.Title>
          <Card.Description>
            Exemplos práticos de como usar os ícones em componentes
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4" className="text-foreground">
              Button with Icon
            </Typography>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                <SearchIcon className="h-4 w-4" />
                Search
              </button>
              <button className="flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-accent">
                <SettingsIcon className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4" className="text-foreground">
              Navigation with Chevron
            </Typography>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <span>Menu Item</span>
                <ChevronIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <span>Another Item</span>
                <ChevronIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4" className="text-foreground">
              Theme Toggle
            </Typography>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-border p-2 hover:bg-accent">
                <SunIcon className="h-5 w-5" />
              </button>
              <button className="rounded-md border border-border p-2 hover:bg-accent">
                <MoonIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="p-6">
        <Card.Header>
          <Card.Title>Import Usage</Card.Title>
          <Card.Description>
            Como importar e usar os ícones no seu código
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <Typography variant="code" className="text-sm">
                {`import { SunIcon, MoonIcon, SearchIcon } from '@/shared/icons'`}
              </Typography>
            </div>
            <div className="rounded-md bg-muted p-4">
              <Typography variant="code" className="text-sm">
                {`<SearchIcon className="w-6 h-6 text-purple-900" />`}
              </Typography>
            </div>
            <div className="rounded-md bg-muted p-4">
              <Typography variant="code" className="text-sm">
                {`<button className="flex items-center gap-2">
  <SettingsIcon className="w-4 h-4" />
  Settings
</button>`}
              </Typography>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  )
}
