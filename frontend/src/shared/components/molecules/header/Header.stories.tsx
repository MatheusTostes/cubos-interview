import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/shared/contexts/theme-context'
import { AuthProvider } from '@/shared/contexts/auth-context'
import { Header } from '@/shared/components/molecules/header'

const meta: Meta<typeof Header> = {
  title: 'Components/Molecules/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <AuthProvider>
            <Story />
          </AuthProvider>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-8 pt-20">
        <h1 className="mb-4 text-2xl font-bold">Header Component Example</h1>
        <p>This shows how the Header component looks in context.</p>
      </div>
    </div>
  ),
}
