import type { Meta, StoryObj } from '@storybook/react'
import { Background } from './index'

const meta: Meta<typeof Background> = {
  title: 'Components/Molecules/Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Background className="min-h-96 w-96" />,
}
