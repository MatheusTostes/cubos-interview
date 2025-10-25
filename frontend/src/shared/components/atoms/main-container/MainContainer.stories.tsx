import type { Meta, StoryObj } from '@storybook/react-vite'
import { MainContainer } from '@/shared/components/atoms/main-container'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof MainContainer> = {
  title: 'Components/Atoms/MainContainer',
  component: MainContainer,
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
    <MainContainer>
      <Typography variant="p">This is a main container</Typography>
    </MainContainer>
  ),
}
