import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorPalette } from '@/shared/components/design-system/ColorPalette'

const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Color Palette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Paleta de cores extraída do Figma para o projeto Cubos Interview. Inclui escalas Purple e Mauve com variações de 100 a 1200, além de cores semânticas que se adaptam aos temas claro e escuro.',
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
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
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
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
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
