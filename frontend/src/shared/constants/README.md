# Routes System

Sistema centralizado de gerenciamento de rotas para o projeto.

## 📁 Estrutura

```
src/shared/constants/
├── routes.ts          # Definições de rotas
├── index.ts          # Exportações
└── README.md         # Documentação
```

## 🚀 Como Usar

### 1. Importar Rotas

```typescript
import { ROUTES } from '@/shared/constants'

// Usar em componentes
<Route path={ROUTES.HOME} element={<Home />} />
```

### 2. Hook de Navegação

```typescript
import { useNavigation } from '@/shared/hooks'

const { goToHome, goToLogin, goToUser } = useNavigation()

// Navegação programática
goToHome()
goToLogin()
goToUser('123')
```

### 3. Componente de Navegação

```typescript
import { Navigation } from '@/shared/components/organisms'

// Usar em layouts
<Navigation />
```

## 🎯 Tipos de Rotas

### **Rotas Públicas**
- `ROUTES.HOME` - Página inicial
- `ROUTES.LOGIN` - Login
- `ROUTES.REGISTER` - Registro

### **Rotas Protegidas**
- `ROUTES.DASHBOARD` - Dashboard
- `ROUTES.PROFILE` - Perfil
- `ROUTES.SETTINGS` - Configurações

### **Rotas de Features**
- `ROUTES.USERS.*` - Gerenciamento de usuários
- `ROUTES.PROJECTS.*` - Gerenciamento de projetos

## 🔧 Funcionalidades

### **Route Helpers**
```typescript
import { routeHelpers } from '@/shared/constants'

// Gerar rotas dinâmicas
routeHelpers.userEdit('123')  // '/users/123/edit'
routeHelpers.projectView('456') // '/projects/456'
```

### **Route Groups**
```typescript
import { ROUTE_GROUPS } from '@/shared/constants'

// Agrupar rotas por funcionalidade
ROUTE_GROUPS.PUBLIC      // Rotas públicas
ROUTE_GROUPS.PROTECTED   // Rotas protegidas
```

### **Route Metadata**
```typescript
import { ROUTE_METADATA } from '@/shared/constants'

// Metadados das rotas
ROUTE_METADATA[ROUTES.HOME].title        // 'Home'
ROUTE_METADATA[ROUTES.HOME].requiresAuth // false
```

## 🎨 Vantagens

- ✅ **Type Safety**: Rotas tipadas
- ✅ **Centralização**: Todas as rotas em um lugar
- ✅ **Manutenibilidade**: Fácil de atualizar
- ✅ **Consistência**: Padrão único
- ✅ **IntelliSense**: Autocompletar no IDE
- ✅ **Refatoração**: Mudanças seguras

## 📝 Exemplos

### **App.tsx**
```typescript
import { ROUTES } from '@/shared/constants'

<Routes>
  <Route path={ROUTES.HOME} element={<Home />} />
  <Route path={ROUTES.LOGIN} element={<Login />} />
</Routes>
```

### **Componente com Navegação**
```typescript
import { useNavigation } from '@/shared/hooks'

const MyComponent = () => {
  const { goToLogin, goToDashboard } = useNavigation()
  
  return (
    <div>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToDashboard}>Dashboard</button>
    </div>
  )
}
```

### **Navegação Dinâmica**
```typescript
import { routeHelpers } from '@/shared/constants'

const userId = '123'
const editUrl = routeHelpers.userEdit(userId) // '/users/123/edit'
```
