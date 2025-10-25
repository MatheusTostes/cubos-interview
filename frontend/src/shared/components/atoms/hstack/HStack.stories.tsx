import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack } from '@/shared/components/atoms/hstack'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof HStack> = {
  title: 'Components/Atoms/HStack',
  component: HStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HStack className="gap-2">
      <Typography variant="p">Item 1</Typography>
      <Typography variant="p">Item 2</Typography>
      <Typography variant="p">Item 3</Typography>
    </HStack>
  ),
}
