import type { Meta, StoryObj } from '@storybook/react'
import { DebounceInput } from './index'
import { useState } from 'react'

const meta: Meta<typeof DebounceInput> = {
  title: 'Components/Molecules/DebounceInput',
  component: DebounceInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder do input',
    },
    debounceMs: {
      control: 'number',
      description: 'Tempo de debounce em milissegundos',
    },
    defaultValue: {
      control: 'text',
      description: 'Valor padrão do input',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback chamado após o debounce',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite para pesquisar...',
    debounceMs: 1000,
    defaultValue: '',
  },
}

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Digite para pesquisar...',
    debounceMs: 1000,
    defaultValue: 'Filme de ação',
  },
}

export const FastDebounce: Story = {
  args: {
    placeholder: 'Digite para pesquisar...',
    debounceMs: 300,
    defaultValue: '',
  },
}

export const SlowDebounce: Story = {
  args: {
    placeholder: 'Digite para pesquisar...',
    debounceMs: 2000,
    defaultValue: '',
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Pesquisar por filmes',
    debounceMs: 1000,
    defaultValue: '',
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [lastChange, setLastChange] = useState('')

    const handleValueChange = (newValue: string) => {
      setValue(newValue)
      setLastChange(new Date().toLocaleTimeString())
    }

    return (
      <div className="space-y-4">
        <DebounceInput
          placeholder="Digite o nome do filme..."
          debounceMs={1000}
          defaultValue=""
          onValueChange={handleValueChange}
        />
        <div className="text-sm text-gray-600">
          <p>
            Valor atual: <strong>{value || '(vazio)'}</strong>
          </p>
          <p>
            Última mudança: <strong>{lastChange || 'Nenhuma'}</strong>
          </p>
        </div>
      </div>
    )
  },
}

export const SearchExample: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState<string[]>([])

    const mockMovies = [
      'O Poderoso Chefão',
      'Pulp Fiction',
      'O Senhor dos Anéis',
      'Matrix',
      'Interestelar',
      'Inception',
      'Cidade de Deus',
      'Tropa de Elite',
    ]

    const handleSearch = (term: string) => {
      setSearchTerm(term)
      if (term.trim()) {
        const filtered = mockMovies.filter((movie) =>
          movie.toLowerCase().includes(term.toLowerCase())
        )
        setResults(filtered)
      } else {
        setResults([])
      }
    }

    return (
      <div className="w-96 space-y-4">
        <DebounceInput
          placeholder="Buscar filmes..."
          debounceMs={500}
          defaultValue=""
          onValueChange={handleSearch}
        />

        {searchTerm && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Resultados para: <strong>"{searchTerm}"</strong>
            </p>
            {results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((movie, index) => (
                  <li key={index} className="rounded bg-gray-100 p-2 text-sm">
                    {movie}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum resultado encontrado
              </p>
            )}
          </div>
        )}
      </div>
    )
  },
}

export const URLParamsExample: Story = {
  render: () => {
    const [urlParams, setUrlParams] = useState('')

    const handleValueChange = (value: string) => {
      const params = new URLSearchParams()
      if (value) {
        params.set('search', value)
      }
      setUrlParams(params.toString())
    }

    return (
      <div className="w-96 space-y-4">
        <DebounceInput
          placeholder="Digite para ver na URL..."
          debounceMs={1000}
          defaultValue=""
          onValueChange={handleValueChange}
        />

        <div className="text-sm">
          <p className="text-gray-600">Parâmetros da URL:</p>
          <code className="mt-1 block rounded bg-gray-100 p-2">
            {urlParams ? `?${urlParams}` : '(vazio)'}
          </code>
        </div>
      </div>
    )
  },
}
