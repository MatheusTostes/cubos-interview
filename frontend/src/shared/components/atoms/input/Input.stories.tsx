import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'

const meta: Meta<typeof Input.Root> = {
  title: 'Components/Atoms/Input',
  component: Input.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input.Root>

export const Default: Story = {
  render: () => (
    <Input.Root className="w-80">
      <Input.Label>Email</Input.Label>
      <Input.Field type="email" placeholder="Enter your email" />
    </Input.Root>
  ),
}

export const WithValue: Story = {
  render: () => (
    <Input.Root className="w-80">
      <Input.Label>Username</Input.Label>
      <Input.Field type="text" defaultValue="john_doe" />
    </Input.Root>
  ),
}

export const Password: Story = {
  render: () => (
    <Input.Root className="w-80">
      <Input.Label>Password</Input.Label>
      <Input.Field type="password" placeholder="Enter your password" />
    </Input.Root>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Input.Root className="w-80">
      <Input.Label>Disabled Input</Input.Label>
      <Input.Field type="text" placeholder="This input is disabled" disabled />
    </Input.Root>
  ),
}

export const Required: Story = {
  render: () => (
    <Input.Root className="w-80">
      <Input.Label required>Required Field</Input.Label>
      <Input.Field type="text" placeholder="This field is required" required />
    </Input.Root>
  ),
}

export const WithError: Story = {
  render: () => (
    <Input.Root className="w-80" error="Please enter a valid email address">
      <Input.Label>Email</Input.Label>
      <Input.Field
        type="email"
        placeholder="Enter your email"
        className="border-destructive focus-visible:ring-destructive"
      />
    </Input.Root>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Input.Root className="w-80">
        <Input.Label>Small</Input.Label>
        <Input.Field
          type="text"
          placeholder="Small input"
          className="h-8 text-xs"
        />
      </Input.Root>

      <Input.Root className="w-80">
        <Input.Label>Default</Input.Label>
        <Input.Field type="text" placeholder="Default input" />
      </Input.Root>

      <Input.Root className="w-80">
        <Input.Label>Large</Input.Label>
        <Input.Field
          type="text"
          placeholder="Large input"
          className="h-12 text-base"
        />
      </Input.Root>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <Input.Root>
        <Input.Label>First Name</Input.Label>
        <Input.Field type="text" placeholder="Enter your first name" />
      </Input.Root>

      <Input.Root>
        <Input.Label>Last Name</Input.Label>
        <Input.Field type="text" placeholder="Enter your last name" />
      </Input.Root>

      <Input.Root>
        <Input.Label>Email</Input.Label>
        <Input.Field type="email" placeholder="Enter your email" />
      </Input.Root>

      <Input.Root>
        <Input.Label>Password</Input.Label>
        <Input.Field type="password" placeholder="Create a password" />
      </Input.Root>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  ),
}
