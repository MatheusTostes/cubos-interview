import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icons } from './index'

const meta: Meta<typeof Icons> = {
  title: 'Design System/Icons',
  component: Icons,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Biblioteca de ícones SVG para o projeto Cubos Interview. Inclui exemplos de uso, variações de tamanho e cor, e casos práticos de implementação.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const LightTheme: Story = {
  args: {},
  decorators: [
    (Story) => {
      // Aplica a classe 'light' apenas no wrapper do story
      return (
        <div className="light">
          <Story />
        </div>
      )
    },
  ],
}

export const DarkTheme: Story = {
  args: {},
  decorators: [
    (Story) => {
      // Aplica a classe 'dark' apenas no wrapper do story
      return (
        <div className="dark">
          <Story />
        </div>
      )
    },
  ],
}
