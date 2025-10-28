import type { Meta, StoryObj } from '@storybook/react'
import { MediaUpload } from './index'
import { useState } from 'react'

const meta: Meta<typeof MediaUpload> = {
  title: 'Components/Molecules/MediaUpload',
  component: MediaUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'fileSelected' },
    accept: {
      control: 'text',
      description: 'Tipos de arquivo aceitos (ex: image/*, video/*)',
    },
    label: {
      control: 'text',
      description: 'Label do campo de upload',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
    initialUrl: {
      control: 'text',
      description: 'URL da imagem inicial (ex: preview existente)',
    },
  },
}

export default meta
type Story = StoryObj<typeof MediaUpload>

export const Default: Story = {
  args: {
    label: 'Upload de imagem',
    accept: 'image/*',
  },
}

export const WithInitialImage: Story = {
  args: {
    label: 'Imagem Principal',
    accept: 'image/*',
    initialUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload com imagem pré-carregada (para edição de filmes).',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Upload de mídia',
    accept: 'image/*',
    error: 'Formato de arquivo não suportado',
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de erro no componente.',
      },
    },
  },
}

export const VideoUpload: Story = {
  args: {
    label: 'Upload de vídeo',
    accept: 'video/*',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload de vídeo (aceita arquivos de vídeo).',
      },
    },
  },
}

export const MultipleFormats: Story = {
  args: {
    label: 'Upload de imagem ou vídeo',
    accept: 'image/*,video/*',
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload aceitando múltiplos formatos.',
      },
    },
  },
}

export const Interactive: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null)
    const [, setPreview] = useState<string | null>(null)

    return (
      <div className="flex w-[400px] flex-col gap-4">
        <MediaUpload
          onFileSelect={(selectedFile) => {
            setFile(selectedFile)
            if (selectedFile) {
              const reader = new FileReader()
              reader.onload = (e) => setPreview(e.target?.result as string)
              reader.readAsDataURL(selectedFile)
            } else {
              setPreview(null)
            }
          }}
          label="Imagem do Filme"
          accept="image/*"
        />
        {file && (
          <div className="rounded-md border border-mauve-600 p-4">
            <p className="text-sm font-medium">Arquivo selecionado:</p>
            <p className="text-sm text-muted-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              Tamanho: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo interativo mostrando informações do arquivo selecionado.',
      },
    },
  },
}
