import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/shared/components/atoms/button'
import { Input } from '@/shared/components/atoms/input'
import { Drawer } from './index'
import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'
import { useState } from 'react'

const meta: Meta<typeof Drawer.Root> = {
  title: 'Components/Atoms/Drawer',
  component: Drawer.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography variant="h4" font="montserrat">
                Drawer Title
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                This is a description of the drawer content
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <div className="px-4">
            <Typography variant="p">
              Drawer content goes here. You can add any content you want.
            </Typography>
          </div>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Cancel
              </Typography>
            </Button>
            <Button onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Confirm
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
      setOpen(false)
    }

    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open Login Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography
                variant="h4"
                font="montserrat"
                className="font-semibold"
              >
                Login
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                Enter your credentials to login
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <VStack className="gap-4 px-4">
            <Input.Root>
              <Input.Label>Email</Input.Label>
              <Input.Field
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label>Password</Input.Label>
              <Input.Field
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Input.Root>
          </VStack>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Cancel
              </Typography>
            </Button>
            <Button onClick={handleSubmit}>
              <Typography variant="p" font="roboto">
                Login
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const FiltersDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('')
    const [year, setYear] = useState('')

    const handleApplyFilters = () => {
      setOpen(false)
    }

    const handleClearFilters = () => {
      setGenre('')
      setRating('')
      setYear('')
    }

    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button variant="secondary">Open Filters</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography
                variant="h4"
                font="montserrat"
                className="font-semibold"
              >
                Filtros
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                Use os filtros abaixo para refinar sua busca
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <VStack className="gap-4 px-4">
            <Input.Root>
              <Input.Label>Gênero</Input.Label>
              <Input.Field
                placeholder="Ex: Ação, Comédia, Drama"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Input.Root>

            <Input.Root>
              <Input.Label>Avaliação Mínima</Input.Label>
              <Input.Field
                type="number"
                placeholder="Ex: 7.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="0"
                max="10"
                step="0.1"
              />
            </Input.Root>

            <Input.Root>
              <Input.Label>Ano</Input.Label>
              <Input.Field
                type="number"
                placeholder="Ex: 2020"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1900"
                max="2025"
              />
            </Input.Root>
          </VStack>
          <Drawer.Footer>
            <Button variant="outline" onClick={handleClearFilters}>
              <Typography variant="p" font="roboto">
                Limpar
              </Typography>
            </Button>
            <Button onClick={handleApplyFilters}>
              <Typography variant="p" font="roboto">
                Aplicar Filtros
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const TopDirection: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen} direction="top">
        <Drawer.Trigger asChild>
          <Button>Open Top Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography variant="h4" font="montserrat">
                Drawer from Top
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                This drawer opens from the top of the screen
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <div className="px-4">
            <Typography variant="p">
              Drawer content from top direction.
            </Typography>
          </div>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Close
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const LeftDirection: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen} direction="left">
        <Drawer.Trigger asChild>
          <Button>Open Left Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography variant="h4" font="montserrat">
                Drawer from Left
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                This drawer opens from the left side of the screen
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <div className="px-4">
            <Typography variant="p">
              Drawer content from left direction.
            </Typography>
          </div>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Close
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const RightDirection: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <Drawer.Trigger asChild>
          <Button>Open Right Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography variant="h4" font="montserrat">
                Drawer from Right
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                This drawer opens from the right side of the screen
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <div className="px-4">
            <Typography variant="p">
              Drawer content from right direction.
            </Typography>
          </div>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Close
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const NoHeaderFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open Simple Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <div className="px-4 py-8">
            <Typography variant="h4" font="montserrat" className="mb-4">
              Simple Drawer
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              This drawer doesn't have a header or footer section.
            </Typography>
            <div className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                <Typography variant="p" font="roboto">
                  Close
                </Typography>
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button>Open Scrollable Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Typography variant="h4" font="montserrat">
                Scrollable Content
              </Typography>
            </Drawer.Title>
            <Drawer.Description>
              <Typography variant="p" className="text-muted-foreground">
                This drawer has scrollable content
              </Typography>
            </Drawer.Description>
          </Drawer.Header>
          <div className="max-h-[400px] overflow-y-auto px-4 py-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-4 rounded-lg bg-muted p-4">
                <Typography variant="p" className="font-semibold">
                  Item {i + 1}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  This is the content for item {i + 1}
                </Typography>
              </div>
            ))}
          </div>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Close
              </Typography>
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    )
  },
}
