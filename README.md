# Cubos Interview - Full Stack Project

Projeto full stack para sistema de gerenciamento de filmes.

## 🏗️ Estrutura do Projeto

```
cubos-interview/
├── frontend/          # Aplicação React + Vite
├── backend/           # API NestJS + Prisma
├── docker-compose.yml # PostgreSQL + pgAdmin
└── README.md
```

## 🚀 Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Storybook

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI

### DevOps
- Docker & Docker Compose
- PostgreSQL 16
- pgAdmin 4

## 📦 Instalação e Setup

### Pré-requisitos
- Node.js 18+
- Yarn
- Docker & Docker Compose

### 1. Subir os serviços (PostgreSQL + pgAdmin)

```bash
# Subir PostgreSQL e pgAdmin
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

### 2. Backend Setup

```bash
cd backend

# Instalar dependências
yarn install

# Copiar arquivo de ambiente
cp .env.example .env

# Gerar Prisma Client
yarn prisma:generate

# Criar banco de dados e migrations
yarn prisma:migrate

# Popular banco com dados de exemplo (opcional)
yarn prisma:seed

# Iniciar servidor de desenvolvimento
yarn dev
```

Acesse:
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`

### 3. Frontend Setup

```bash
cd frontend

# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev
```

Acesse: `http://localhost:5173`

## 🔧 Comandos Úteis

### Docker

```bash
# Subir serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs postgres
docker-compose logs pgadmin

# Resetar volumes (apaga todos os dados)
docker-compose down -v
docker-compose up -d
```

### Backend

```bash
cd backend

# Desenvolvimento
yarn dev

# Gerar Prisma Client
yarn prisma:generate

# Criar migration
yarn prisma:migrate

# Prisma Studio (interface visual)
yarn prisma:studio

# Popular banco
yarn prisma:seed

# Build produção
yarn build
```

### Frontend

```bash
cd frontend

# Desenvolvimento
yarn dev

# Build produção
yarn build

# Storybook
yarn storybook
```

## 🗄️ Acessar o Banco de Dados

### pgAdmin (Interface Web)

Acesse: `http://localhost:5050`

**Credenciais:**
- Email: `admin@cubos.com`
- Senha: `admin123`

**Conexão com o PostgreSQL:**
- Host: `postgres` (nome do serviço do docker)
- Port: `5432`
- Database: `cubos_interview`
- Username: `cubos`
- Password: `cubos123`

### Prisma Studio

```bash
cd backend
yarn prisma:studio
```

Acesse: `http://localhost:5555`

## 📝 Credenciais de Teste

### Usuário de Teste (Seed)
- Email: `test@example.com`
- Senha: `password123`

Ou crie uma conta nova pela API:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"User","password":"123456"}'
```

## 📚 Documentação

### API Swagger
- URL: `http://localhost:3000/api/docs`
- Todas as rotas documentadas com exemplos

### Storybook (Frontend)
```bash
cd frontend
yarn storybook
```
- URL: `http://localhost:6006`
- Componentes com documentação interativa

## 🏗️ Arquitetura

### Backend - Feature-Based

```
backend/src/
├── features/
│   ├── auth/         # Autenticação
│   ├── users/        # Usuários
│   └── movies/       # Filmes
├── shared/           # Código compartilhado
│   ├── prisma/       # Prisma Service
│   ├── guards/       # JWT Guard
│   └── decorators/   # Decorators customizados
└── app.module.ts
```

### Frontend - Feature-Based

```
frontend/src/
├── features/
│   ├── login/        # Login
│   ├── home/         # Home
│   └── movies/       # Filmes
├── shared/           # Componentes e hooks compartilhados
└── pages/           # Páginas da aplicação
```

## 🔐 Autenticação

Todas as rotas (exceto `/auth/*`) requerem JWT:

1. Fazer login: `POST /api/auth/login`
2. Copiar o `access_token`
3. Usar no header: `Authorization: Bearer <token>`

No Swagger, use o botão "Authorize" (🔓 no topo).

## 📦 Estrutura do Banco

- **users** - Usuários
- **movies** - Catálogo de filmes
- **genres** - Gêneros
- **movie_genres** - Relação filmes ⇄ gêneros
- **user_movies** - Histórico/avaliações do usuário

## 🐛 Troubleshooting

### PostgreSQL não conecta
```bash
docker-compose ps              # Ver status
docker-compose logs postgres   # Ver logs
docker-compose restart postgres # Reiniciar
```

### Resetar banco completamente
```bash
docker-compose down -v        # Remove volumes
docker-compose up -d          # Recria containers
cd backend
yarn prisma:migrate           # Recria schema
yarn prisma:seed              # Popula dados
```

### Porta já em uso
Altere as portas em:
- `docker-compose.yml` - PostgreSQL e pgAdmin
- `backend/.env` - PORT do servidor
- `frontend/vite.config.ts` - PORT do frontend

## 🎯 Próximos Passos

- [ ] Implementar testes E2E
- [ ] Adicionar CI/CD
- [ ] Implementar cache (Redis)
- [ ] Sistema de upload de imagens
- [ ] Filtros avançados de filmes
- [ ] Notificações
- [ ] Sistema de busca

## 📄 Licença

MIT



