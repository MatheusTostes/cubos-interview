import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '@/shared/components/atoms/card'
import { Button } from '@/shared/components/atoms/button'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof Card.Root> = {
  title: 'Components/Atoms/Card',
  component: Card.Root,
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
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Card Title</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">Card description goes here.</Typography>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="p">Card content goes here.</Typography>
      </Card.Content>
    </Card.Root>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Card with Footer</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">
            This card includes a footer section.
          </Typography>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="p">
          This is the main content of the card.
        </Typography>
      </Card.Content>
      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Content>
        <Typography variant="p">Simple card with just content.</Typography>
      </Card.Content>
    </Card.Root>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Header Only</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">This card only has a header.</Typography>
        </Card.Description>
      </Card.Header>
    </Card.Root>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card.Root className="w-[350px]">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Card with Actions</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">
            This card has multiple action buttons.
          </Typography>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="p">Choose an action below:</Typography>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const Large: Story = {
  render: () => (
    <Card.Root className="w-[500px]">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Large Card</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">
            This is a larger card with more content.
          </Typography>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="p">
          This card has more space for content and can accommodate larger
          amounts of text or more complex layouts.
        </Typography>
        <Typography variant="p" className="mt-4">
          You can add multiple paragraphs or other elements here.
        </Typography>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Full Width Action</Button>
      </Card.Footer>
    </Card.Root>
  ),
}

export const Compact: Story = {
  render: () => (
    <Card.Root className="w-[250px]">
      <Card.Header className="pb-2">
        <Card.Title>
          <Typography variant="h3">Compact</Typography>
        </Card.Title>
      </Card.Header>
      <Card.Content className="pt-0">
        <Typography variant="p">Small card for quick info.</Typography>
      </Card.Content>
    </Card.Root>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card.Root className="w-[350px] cursor-pointer transition-shadow hover:shadow-md">
      <Card.Header>
        <Card.Title>
          <Typography variant="h3">Interactive Card</Typography>
        </Card.Title>
        <Card.Description>
          <Typography variant="p">This card has hover effects.</Typography>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="p">
          Hover over this card to see the shadow effect.
        </Typography>
      </Card.Content>
    </Card.Root>
  ),
}
