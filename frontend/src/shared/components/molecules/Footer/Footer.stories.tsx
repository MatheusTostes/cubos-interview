import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '@/shared/components/molecules/footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/Molecules/Footer',
  component: Footer,
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
  render: () => <Footer />,
}
