import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/shared/components/atoms/button'
import { Input } from '@/shared/components/atoms/input'
import { Dialog } from './index'
import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'
import { useState } from 'react'

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Atoms/Dialog',
  component: Dialog.Root,
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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              <Typography variant="h4" font="montserrat">
                Dialog Title
              </Typography>
            </Dialog.Title>
            <Dialog.Description>
              <Typography variant="p" className="text-muted-foreground">
                This is a description of the dialog content
              </Typography>
            </Dialog.Description>
          </Dialog.Header>
          <div>
            <Typography variant="p">
              Dialog content goes here. You can add any content you want.
            </Typography>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
      console.log({ email, password })
      setOpen(false)
    }

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button>Open Login Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>
              <Typography
                variant="h4"
                font="montserrat"
                className="font-semibold"
              >
                Login
              </Typography>
            </Dialog.Title>
            <Dialog.Description>
              <Typography variant="p" className="text-muted-foreground">
                Enter your credentials to login
              </Typography>
            </Dialog.Description>
          </Dialog.Header>
          <VStack className="gap-4 py-4">
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
          <Dialog.Footer>
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
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}

export const FiltersDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('')
    const [year, setYear] = useState('')

    const handleApplyFilters = () => {
      console.log('Aplicar filtros:', { genre, rating, year })
      setOpen(false)
    }

    const handleClearFilters = () => {
      setGenre('')
      setRating('')
      setYear('')
    }

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="secondary">Open Filters</Button>
        </Dialog.Trigger>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>
              <Typography
                variant="h4"
                font="montserrat"
                className="font-semibold"
              >
                Filtros
              </Typography>
            </Dialog.Title>
            <Dialog.Description>
              <Typography variant="p" className="text-muted-foreground">
                Use os filtros abaixo para refinar sua busca
              </Typography>
            </Dialog.Description>
          </Dialog.Header>
          <VStack className="gap-4 py-4">
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
          <Dialog.Footer>
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
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}

export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
      console.log('Action confirmed')
      setOpen(false)
    }

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="destructive">Delete Item</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              <Typography
                variant="h4"
                font="montserrat"
                className="font-semibold"
              >
                Are you sure?
              </Typography>
            </Dialog.Title>
            <Dialog.Description>
              <Typography variant="p" className="text-muted-foreground">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </Typography>
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Cancel
              </Typography>
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              <Typography variant="p" font="roboto">
                Delete
              </Typography>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}

export const CustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button>Open Custom Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="sm:max-w-[600px]">
          <Dialog.Header>
            <Dialog.Title>
              <Typography variant="h3" font="montserrat" className="font-bold">
                Custom Dialog
              </Typography>
            </Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4 py-4">
            <Typography variant="p">
              This is a custom dialog with more space and custom content. You
              can add images, videos, or any other content here.
            </Typography>
            <div className="rounded-lg bg-muted p-4">
              <Typography variant="p" className="text-muted-foreground">
                Custom content area
              </Typography>
            </div>
          </div>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Close
              </Typography>
            </Button>
            <Button onClick={() => setOpen(false)}>
              <Typography variant="p" font="roboto">
                Save
              </Typography>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  },
}
