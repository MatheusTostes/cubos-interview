import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '@/shared/components/organisms/navigation'

const meta: Meta<typeof Navigation> = {
  title: 'Components/Organisms/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navigation>

export const Default: Story = {
  args: {},
}

export const WithCustomClassName: Story = {
  args: {
    className: 'bg-muted p-4 rounded-lg',
  },
}

export const Horizontal: Story = {
  args: {
    className: 'flex-row space-x-1 space-y-0',
  },
}

export const Vertical: Story = {
  args: {
    className: 'flex-col space-x-0 space-y-1',
  },
}
