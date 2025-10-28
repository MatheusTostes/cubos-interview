import type { Meta, StoryObj } from '@storybook/react'
import { AuthPageSkeleton } from '.'

const meta: Meta<typeof AuthPageSkeleton> = {
  title: 'Components/Molecules/AuthPageSkeleton',
  component: AuthPageSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AuthPageSkeleton>

export const Default: Story = {}

export const WithCustomMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Componente de skeleton usado durante o carregamento de páginas de autenticação com Suspense.',
      },
    },
  },
}
