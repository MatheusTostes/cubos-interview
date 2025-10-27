# 🚀 Quick Start - Cubos Interview

Guia rápido para iniciar o projeto.

## 1️⃣ Subir o Banco de Dados (PostgreSQL + pgAdmin)

```bash
# Na pasta raiz do projeto
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

**Acesse:**
- pgAdmin: `http://localhost:5050` (admin@cubos.com / admin123)
- PostgreSQL: `localhost:5432`

## 2️⃣ Configurar o Backend

```bash
cd backend

# Instalar dependências
yarn install

# Copiar .env
cp .env.example .env

# Gerar Prisma Client
yarn prisma:generate

# Criar banco e migrations
yarn prisma:migrate

# Popular com dados de exemplo (opcional)
yarn prisma:seed

# Iniciar servidor
yarn dev
```

**Acesse:**
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`

## 3️⃣ Configurar o Frontend

```bash
# Em outro terminal
cd frontend

# Instalar dependências
yarn install

# Iniciar servidor
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

Use o token retornado nos próximos requests.

### Ver perfil (com token)
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📊 Visualizar o Banco

### pgAdmin (Recomendado)
1. Acesse: `http://localhost:5050`
2. Login: `admin@cubos.com` / Senha: `admin123`
3. Registre o servidor PostgreSQL:
   - Host: `postgres`
   - Port: `5432`
   - Database: `cubos_interview`
   - Username: `cubos`
   - Password: `cubos123`

### Prisma Studio (Alternativa)
```bash
cd backend
yarn prisma:studio
```
Acesse: `http://localhost:5555`

## 🛑 Parar Tudo

```bash
# Parar containers
docker-compose down

# Parar backend (Ctrl+C no terminal)
# Parar frontend (Ctrl+C no terminal)
```

## 🔄 Resetar Banco (Apagar Todos os Dados)

```bash
# Parar e remover volumes
docker-compose down -v

# Subir novamente
docker-compose up -d

# Recriar banco
cd backend
yarn prisma:migrate
yarn prisma:seed  # popular dados
```

## 📝 Credenciais

### pgAdmin
- Email: `admin@cubos.com`
- Senha: `admin123`

### PostgreSQL
- User: `cubos`
- Password: `cubos123`
- Database: `cubos_interview`

### Usuário de Teste (Seed)
- Email: `test@example.com`
- Senha: `password123`



