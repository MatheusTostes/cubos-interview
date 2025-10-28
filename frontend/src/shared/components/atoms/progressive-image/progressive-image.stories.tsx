import type { Meta, StoryObj } from '@storybook/react'
import { ProgressiveImage } from './index'

const meta: Meta<typeof ProgressiveImage> = {
  title: 'Components/Atoms/ProgressiveImage',
  component: ProgressiveImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem principal',
    },
    placeholderSrc: {
      control: 'text',
      description: 'URL da imagem placeholder (opcional)',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo para acessibilidade',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressiveImage>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    alt: 'Movie poster',
    className: 'h-96 w-96',
  },
}

export const WithPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
    placeholderSrc:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=100&blur=20',
    alt: 'Movie poster with blur placeholder',
    className: 'h-96 w-96',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Imagem progressiva com placeholder embaçado que aparece enquanto a imagem principal carrega.',
      },
    },
  },
}

export const SmallImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    alt: 'Small movie poster',
    className: 'h-64 w-64',
  },
}

export const LargeImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600',
    alt: 'Large movie poster',
    className: 'h-[500px] w-[800px]',
  },
}

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Invalid image',
    className: 'h-96 w-96',
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de erro quando a imagem não pode ser carregada.',
      },
    },
  },
}

export const AspectRatioPortrait: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
    alt: 'Portrait movie poster',
    className: 'h-96 w-72',
  },
}

export const AspectRatioLandscape: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',
    alt: 'Landscape movie poster',
    className: 'h-56 w-96',
  },
}
