import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorPalette } from '@/shared/components/design-system/color-palette'
import { useEffect } from 'react'

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
  decorators: [
    (Story) => {
      useEffect(() => {
        // Garante que o theme padrão é light
        document.documentElement.classList.remove('dark')
        return () => {
          // Cleanup
        }
      }, [])
      return <Story />
    },
  ],
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
      useEffect(() => {
        // Remove a classe 'dark' do body para garantir light theme
        document.documentElement.classList.remove('dark')
      }, [])
      return <Story />
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
      useEffect(() => {
        // Adiciona a classe 'dark' ao html
        document.documentElement.classList.add('dark')
        return () => {
          // Remove ao desmontar
          document.documentElement.classList.remove('dark')
        }
      }, [])
      return (
        <div className="dark">
          <Story />
        </div>
      )
    },
  ],
}
