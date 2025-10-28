import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './index'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    className: 'h-4 w-[200px]',
  },
}

export const Text: Story = {
  args: {
    className: 'h-4 w-[300px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de texto.',
      },
    },
  },
}

export const Title: Story = {
  args: {
    className: 'h-8 w-[250px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de título.',
      },
    },
  },
}

export const Avatar: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de avatar.',
      },
    },
  },
}

export const Card: Story = {
  args: {
    className: 'h-[200px] w-[300px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de card.',
      },
    },
  },
}

export const Image: Story = {
  args: {
    className: 'h-[400px] w-[600px] rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de imagem.',
      },
    },
  },
}

export const Button: Story = {
  args: {
    className: 'h-10 w-[120px] rounded',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton para simular carregamento de botão.',
      },
    },
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-[100px] rounded" />
        <Skeleton className="h-10 w-[100px] rounded" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Múltiplos skeletons para simular carregamento de conteúdo completo.',
      },
    },
  },
}
