import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '@/shared/components/atoms/container'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof Container> = {
  title: 'Components/Atoms/Container',
  component: Container,
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
    <Container>
      <Typography variant="p">This is a container</Typography>
    </Container>
  ),
}
