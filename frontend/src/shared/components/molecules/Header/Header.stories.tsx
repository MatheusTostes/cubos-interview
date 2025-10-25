import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '@/shared/components/molecules/Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Molecules/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Cubos Interview',
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Custom App Title',
  },
}
