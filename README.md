# Cubos Interview - Sistema de Gerenciamento de Filmes

Sistema full stack para gerenciamento de filmes desenvolvido como teste técnico, implementando as melhores práticas de desenvolvimento moderno.

## 🎯 Destaques do Projeto

### 🚀 Performance e Build

- **React 18 + Vite**: Build ultra-rápido (HMR instantâneo) e bundle otimizado
- **TypeScript**: Type-safety em todo o projeto
- **Code Splitting**: Carregamento sob demanda com React.lazy e Suspense
- **Otimizações**: Progressive image loading, lazy loading de componentes

### 🏗️ Arquitetura Escalável

- **Backend Feature-Based**: Separação de responsabilidades por domínio (auth, movies, users, etc)
- **Frontend Atomic Design + Feature-Based**: Componentes reutilizáveis organizados hierarquicamente
- **Modularidade**: Cada feature é independente e testável
- **Clean Architecture**: DTOs, Services, Controllers bem definidos

### 🔐 Segurança e Autenticação

- **JWT com Refresh Tokens**: Autenticação stateless e segura
- **Token Blacklist**: Redis para invalidar tokens no logout (segurança avançada)
- **Magic Link Password Reset**: Email com token único e expiração (1h)
- **Case-Insensitive Search**: Email e username funcionam com qualquer capitalização
- **bcrypt**: Senhas hasheadas com salt rounds
- **Guard Global**: Proteção automática de todas as rotas (exceto @Public())

### 📧 Sistema de Email e Background Jobs

- **BullMQ + Redis**: Processamento assíncrono de emails em background
- **Notificações Agendadas**: Sistema de notificação de lançamento de filmes
- **Resend**: Envio de emails transacional (welcome, reset password, etc)
- **Queue Management**: Retry automático e tratamento de erros

### ☁️ Infraestrutura e DevOps

- **Docker Compose**: Ambiente completo (PostgreSQL, Redis, pgAdmin, Redis Insight)
- **Multi-Stage Build**: Imagens Docker otimizadas para produção
- **Cloudflare R2**: Upload e armazenamento de imagens em CDN global
- **Nginx**: Servidor web otimizado com gzip, cache e security headers
- **Volume Persistence**: Dados persistidos em volumes Docker

### 🛠️ Ferramentas de Desenvolvimento

- **Prisma ORM**: Type-safe queries, migrations automáticas, Prisma Studio
- **Swagger/OpenAPI**: Documentação automática e interativa da API
- **Storybook**: Documentação visual de componentes React
- **Pino Logger**: Logging estruturado e performático
- **ESLint + Prettier**: Código limpo e padronizado
- **Commitlint + Husky**: Conventional commits com validação automática
- **Pre-commit hooks**: Lint automático antes de cada commit

## 🚀 Tecnologias

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Storybook  
**Backend:** NestJS + Prisma + PostgreSQL + JWT + Swagger + BullMQ + Redis  
**DevOps:** Docker + PostgreSQL + Redis + Cloudflare R2 + Nginx

## ✨ Funcionalidades Implementadas

### 🔑 Autenticação Completa

- ✅ Registro de usuário
- ✅ Login com JWT + Refresh Token
- ✅ Logout com invalidação de token (Redis blacklist)
- ✅ Recuperação de senha via email (magic link)
- ✅ Reset de senha com token seguro (expira em 1h)
- ✅ Busca case-insensitive (email/nome)
- ✅ Proteção de rotas com Guards

### 🎬 Gerenciamento de Filmes

- ✅ CRUD completo de filmes
- ✅ Upload de imagens (Cloudflare R2)
- ✅ Sistema de gêneros múltiplos
- ✅ Classificação indicativa
- ✅ Situação (assistido, quer assistir, etc)
- ✅ Idiomas suportados
- ✅ Filtros avançados (cancelado, em breve, lançado, etc)
- ✅ Paginação e busca

### 📧 Sistema de Notificações

- ✅ Email de boas-vindas
- ✅ Recuperação de senha
- ✅ Notificações de lançamento de filmes
- ✅ Processamento assíncrono (BullMQ)
- ✅ Background jobs com Redis

### 🎨 Interface do Usuário

- ✅ Design moderno e responsivo (Tailwind CSS)
- ✅ Componentes reutilizáveis (Atomic Design)
- ✅ Storybook para documentação
- ✅ Formulários com validação (React Hook Form + Zod)
- ✅ Loading states e error handling
- ✅ Toast notifications

## 🚀 Quick Start

### 1️⃣ Subir serviços (PostgreSQL + Redis + pgAdmin)

```bash
docker-compose up -d
docker-compose ps  # verificar status
```

**Acesse:**

- pgAdmin: `http://localhost:5050` (admin@cubos.com / admin123)
- PostgreSQL: `localhost:5432`

### 2️⃣ Backend

```bash
cd backend
yarn install
cp .env.example .env
yarn prisma:generate
yarn prisma:migrate
yarn prisma:seed  # dados de exemplo
yarn dev
```

**Acesse:**

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`

### 3️⃣ Frontend

```bash
cd frontend
yarn install
yarn dev
```

**Acesse:** `http://localhost:5173`

## 🎯 Testar a API

### Criar usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### Ver perfil (com token)

```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🛑 Parar Tudo

```bash
docker-compose down  # Parar containers
# Ctrl+C nos terminais para parar backend/frontend
```

## 🔄 Resetar Banco (apagar todos os dados)

```bash
docker-compose down -v
docker-compose up -d
cd backend
yarn prisma:migrate
yarn prisma:seed
```

## ☁️ Configurar Cloudflare R2 (Upload de Imagens)

### 1. Criar credenciais no Cloudflare

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **R2** → Seu bucket → **Settings** → **R2 API Token**
3. Clique **"Create API Token"**:
   - **Token name**: `cubos-movies-api`
   - **Permissions**: Read & Write
   - **Bucket**: Selecione seu bucket
4. **Copie e guarde**: `Access Key ID` e `Secret Access Key`

### 2. Configurar no backend

Adicione ao `backend/.env`:

```env
# URL pública do bucket (para acessar imagens)
R2_PUBLIC_URL="https://pub-xxxxxxxxxxx.r2.dev"

# Endpoint do R2 (para upload via API)
R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"

# Nome do bucket
R2_BUCKET_NAME="cubos-movies"

# Credenciais da API Token
R2_ACCESS_KEY_ID="sua-access-key-id"
R2_SECRET_ACCESS_KEY="sua-secret-access-key"
```

### 3. Testar upload

```bash
cd backend
yarn dev
```

Teste no Swagger: `http://localhost:3000/api/docs` → `/api/upload/image`

## 🔧 Comandos Úteis

```bash
# Docker
docker-compose up -d          # Subir serviços
docker-compose down           # Parar serviços
docker-compose logs postgres  # Ver logs

# Backend
cd backend
yarn dev                      # Desenvolvimento
yarn prisma:studio           # Interface visual do banco
yarn prisma:migrate          # Criar migrations
yarn prisma:seed             # Popular banco

# Frontend
cd frontend
yarn dev                     # Desenvolvimento
yarn storybook              # Documentação de componentes
```

## 🗄️ Acessar o Banco

**pgAdmin:** `http://localhost:5050` (admin@cubos.com / admin123)  
**Prisma Studio:** `cd backend && yarn prisma:studio` → `http://localhost:5555`

## 📝 Credenciais de Teste

**Usuário Seed:** `test@example.com` / `password123`  
**PostgreSQL:** `cubos` / `cubos123` / `cubos_interview`

## 📚 Documentação

**API Swagger:** `http://localhost:3000/api/docs`  
**Storybook:** `cd frontend && yarn storybook` → `http://localhost:6006`

## 🏗️ Arquitetura

**Backend:** Feature-based com NestJS + Prisma  
**Frontend:** Feature-based + Atomic Design com React  
**Autenticação:** JWT com refresh tokens  
**Banco:** PostgreSQL com Redis para cache

## 🐛 Troubleshooting

```bash
# Resetar banco completamente
docker-compose down -v
docker-compose up -d
cd backend && yarn prisma:migrate && yarn prisma:seed

# Ver logs
docker-compose logs postgres
```

## 📖 Documentação Completa

- **Desenvolvimento:** Este README
- **Produção:** Ver `README-PRODUCTION.md`

## 📄 Licença

MIT
