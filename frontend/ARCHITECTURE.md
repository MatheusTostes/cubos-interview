# Arquitetura do Projeto

## Feature-Based Architecture + Atomic Design

Este projeto utiliza uma combinação de **Feature-Based Architecture** e **Atomic Design** para criar uma estrutura escalável e organizada.

## 📁 Estrutura de Pastas

```
src/
├── features/                    # Features (funcionalidades)
│   └── Home/                   # Feature: Home
│       ├── components/         # Componentes específicos da feature
│       ├── hooks/             # Hooks específicos da feature
│       ├── types/             # Tipos específicos da feature
│       ├── Home.tsx           # Página principal da feature
│       └── index.ts           # Exports da feature
├── shared/                     # Recursos compartilhados
│   ├── components/            # Componentes reutilizáveis (Atomic Design)
│   │   ├── atoms/             # Componentes atômicos
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   └── index.ts
│   │   ├── molecules/         # Componentes moleculares
│   │   │   ├── Template/     # Template component
│   │   │   └── index.ts
│   │   ├── organisms/         # Componentes orgânicos
│   │   │   ├── MainLayout/   # Layout principal
│   │   │   └── index.ts
│   │   ├── templates/         # Templates
│   │   └── index.ts
│   ├── hooks/                 # Hooks compartilhados
│   ├── types/                 # Tipos compartilhados
│   ├── utils/                 # Utilitários compartilhados
│   ├── constants/             # Constantes compartilhadas
│   └── index.ts               # Exports compartilhados
├── App.tsx                    # Componente principal
└── main.tsx                   # Ponto de entrada
```

## 🧬 Atomic Design

### Atoms (Átomos)
- **Propósito**: Componentes básicos e indivisíveis
- **Exemplos**: Button, Input, Card, Icon
- **Localização**: `shared/components/atoms/`

### Molecules (Moléculas)
- **Propósito**: Combinação de átomos para formar componentes simples
- **Exemplos**: SearchBox, FormField, Template
- **Localização**: `shared/components/molecules/`

### Organisms (Organismos)
- **Propósito**: Componentes complexos que combinam moléculas e átomos
- **Exemplos**: Header, Sidebar, MainLayout
- **Localização**: `shared/components/organisms/`

### Templates
- **Propósito**: Estruturas de layout que definem posicionamento
- **Exemplos**: PageTemplate, DashboardTemplate
- **Localização**: `shared/components/templates/`

## 🏗️ Feature-Based Architecture

### Features (Funcionalidades)
Cada feature é uma unidade independente que contém:
- **components/**: Componentes específicos da feature
- **hooks/**: Lógica de estado específica da feature
- **types/**: Tipos TypeScript específicos da feature
- **index.ts**: Exports públicos da feature

### Exemplo de Feature: Home
```
features/Home/
├── components/          # Componentes específicos do Home
├── hooks/              # useHomeData, useHomeActions, etc.
├── types/              # HomeProps, HomeState, etc.
├── Home.tsx            # Página principal
└── index.ts            # Exports públicos
```

## 📦 Sistema de Imports

### Imports Limpos
```typescript
// ✅ Bom - Import limpo
import { Button, Card } from '@/shared'
import { Home } from '@/features/Home'

// ❌ Ruim - Import longo
import { Button } from '@/shared/components/atoms/ui/button'
```

### Barrel Exports
Cada pasta tem um `index.ts` que exporta seus conteúdos:
- `shared/index.ts` - Exporta todos os recursos compartilhados
- `features/Home/index.ts` - Exporta a feature Home
- `shared/components/index.ts` - Exporta todos os componentes

## 🎯 Benefícios

### Feature-Based
- ✅ **Isolamento**: Cada feature é independente
- ✅ **Escalabilidade**: Fácil adicionar novas features
- ✅ **Manutenibilidade**: Mudanças isoladas por feature
- ✅ **Reutilização**: Features podem ser movidas entre projetos

### Atomic Design
- ✅ **Consistência**: Componentes padronizados
- ✅ **Reutilização**: Átomos e moléculas reutilizáveis
- ✅ **Documentação**: Estrutura clara e documentável
- ✅ **Testabilidade**: Componentes isolados são mais fáceis de testar

## 🚀 Como Adicionar Nova Feature

1. **Criar estrutura da feature**:
```bash
mkdir src/features/NewFeature
mkdir src/features/NewFeature/components
mkdir src/features/NewFeature/hooks
mkdir src/features/NewFeature/types
```

2. **Criar index.ts**:
```typescript
// src/features/NewFeature/index.ts
export { default as NewFeature } from './NewFeature'
```

3. **Adicionar ao roteamento**:
```typescript
// src/App.tsx
import { NewFeature } from './features/NewFeature'
```

## 🧪 Como Adicionar Novo Componente

### Para Componente Compartilhado (Atomic Design)
1. **Identificar nível**: Atom, Molecule, Organism ou Template
2. **Criar na pasta apropriada**: `shared/components/[level]/`
3. **Adicionar ao index.ts** da pasta
4. **Criar Storybook story**

### Para Componente de Feature
1. **Criar na feature**: `features/[FeatureName]/components/`
2. **Usar apenas dentro da feature**
3. **Não exportar no index.ts da feature** (componente interno)

## 📚 Convenções

### Nomenclatura
- **Features**: PascalCase (Home, UserProfile, Dashboard)
- **Components**: PascalCase (Button, UserCard, MainLayout)
- **Hooks**: camelCase com prefixo "use" (useHomeData, useUserAuth)
- **Types**: PascalCase com sufixo apropriado (UserProps, HomeState)

### Estrutura de Arquivos
- **Componente**: `ComponentName.tsx`
- **Story**: `ComponentName.stories.tsx`
- **Mocks**: `ComponentName.mocks.ts`
- **Types**: `ComponentName.types.ts`
- **Index**: `index.ts`

Esta arquitetura garante que o projeto seja escalável, maintível e fácil de entender, seguindo as melhores práticas de desenvolvimento React.
