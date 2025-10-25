import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/shared/contexts/ThemeContext'
import { Background } from './index'

const meta: Meta<typeof Background> = {
  title: 'Components/Molecules/Background',
  component: Background,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
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
  render: () => <Background className="min-h-96 w-96" />,
}

export const FullScreen: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <Background />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="rounded-lg bg-white/90 p-8 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Background Example
          </h1>
          <p className="text-gray-600">
            This shows the background component in full screen
          </p>
        </div>
      </div>
    </div>
  ),
}

export const WithContent: Story = {
  render: () => (
    <div className="relative h-96 w-full">
      <Background />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="rounded-lg bg-black/50 p-6 text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Overlay Content</h2>
          <p>Background with overlay content</p>
        </div>
      </div>
    </div>
  ),
}
