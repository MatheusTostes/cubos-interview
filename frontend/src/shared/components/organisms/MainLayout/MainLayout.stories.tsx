import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/shared/contexts/ThemeContext'
import { MainLayout } from '@/shared/components/organisms/MainLayout'

const meta: Meta<typeof MainLayout> = {
  title: 'Components/Organisms/MainLayout',
  component: MainLayout,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Story />
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
  args: {
    children: 'Main Layout Content',
  },
}

export const WithComplexContent: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="mb-4 text-3xl font-bold">Welcome to Cubos Movies</h1>
        <p className="mb-6 text-lg">
          This is an example of how the MainLayout component works with complex
          content.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Feature 3</h3>
            <p>Description of feature 3</p>
          </div>
        </div>
      </div>
    ),
  },
}
