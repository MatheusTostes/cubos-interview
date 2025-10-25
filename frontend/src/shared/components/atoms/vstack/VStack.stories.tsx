import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack } from '@/shared/components/atoms/vstack'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof VStack> = {
  title: 'Components/Atoms/VStack',
  component: VStack,
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
    <VStack className="gap-2">
      <Typography variant="p">Item 1</Typography>
      <Typography variant="p">Item 2</Typography>
      <Typography variant="p">Item 3</Typography>
    </VStack>
  ),
}
