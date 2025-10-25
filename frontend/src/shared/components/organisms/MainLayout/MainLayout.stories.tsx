import type { Meta, StoryObj } from '@storybook/react'
import { MainLayout } from '@/shared/components/organisms/MainLayout'

const meta: Meta<typeof MainLayout> = {
  title: 'Components/Organisms/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Main Layout Content',
  },
}
