import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/shared/components/atoms/typography'

const meta: Meta<typeof Typography> = {
  title: 'Components/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'div',
        'label',
        'small',
        'blockquote',
        'code',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'default',
        'muted',
        'primary',
        'secondary',
        'destructive',
        'accent',
      ],
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    font: {
      control: { type: 'select' },
      options: ['sans', 'display'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is default typography',
  },
}

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
}

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'This is a paragraph with normal text. It demonstrates the default styling for body text.',
  },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default color text</Typography>
      <Typography color="muted">Muted color text</Typography>
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="destructive">Destructive color text</Typography>
      <Typography color="accent">Accent color text</Typography>
    </div>
  ),
}

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extrabold weight text</Typography>
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography align="left" className="block">
          Left aligned text
        </Typography>
      </div>
      <div>
        <Typography align="center" className="block">
          Center aligned text
        </Typography>
      </div>
      <div>
        <Typography align="right" className="block">
          Right aligned text
        </Typography>
      </div>
      <div>
        <Typography align="justify" className="block">
          Justified text that spreads across the full width of the container.
          This demonstrates how text can be justified to create even margins on
          both sides.
        </Typography>
      </div>
    </div>
  ),
}

export const Special: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="small">
        Small text for captions and labels
      </Typography>
      <Typography variant="label">Label text for form elements</Typography>
      <Typography variant="code">const example = "code text"</Typography>
      <Typography variant="blockquote">
        This is a blockquote that demonstrates how quoted text can be styled
        with proper indentation and borders.
      </Typography>
    </div>
  ),
}

export const CustomElement: Story = {
  args: {
    as: 'section',
    variant: 'h2',
    children: 'This is an h2 styled element rendered as a section',
  },
}

export const LongText: Story = {
  args: {
    children:
      'This is a longer paragraph that demonstrates how the Typography component handles extended text content. It shows the line height, spacing, and overall readability of the text styling. The component is designed to be flexible and work well in various contexts throughout the application.',
  },
}

export const FontComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Typography variant="h2" font="inter">
          Inter Font (Default)
        </Typography>
        <Typography font="inter">
          This text uses Inter font, which is the default font for the project.
          It's optimized for readability and user interface design.
        </Typography>
      </div>
      <div>
        <Typography variant="h2" font="montserrat">
          Montserrat Font (Display)
        </Typography>
        <Typography font="montserrat">
          This text uses Montserrat font, which is great for headings and
          display text. It has a more distinctive character and works well for
          titles.
        </Typography>
      </div>
    </div>
  ),
}
