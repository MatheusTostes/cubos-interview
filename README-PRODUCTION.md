# 🚀 README - Deploy em Produção

Guia completo para deploy da aplicação em produção usando Docker Compose.

## 📋 Pré-requisitos

- Docker Engine 20.10+
- Docker Compose 2.0+
- Acesso a internet para baixar imagens

## 🔧 Configuração

### 1. Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp env.production.example .env
```

Edite o arquivo `.env` e configure:

#### 🔑 Variáveis Obrigatórias

- `JWT_SECRET`: Gere uma chave secreta forte para JWT
- `RESEND_API_KEY`: Chave da API do Resend para envio de emails
- `AWS_*`: Credenciais do Cloudflare R2 ou AWS S3

#### ☁️ Configuração Cloudflare R2

Para upload de imagens, configure:

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

**Como obter as credenciais:**

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **R2** → Seu bucket → **Settings** → **R2 API Token**
3. Clique **"Create API Token"** com permissões Read & Write
4. Copie `Access Key ID` e `Secret Access Key`

#### 🔒 Segurança

**IMPORTANTE**: Altere TODAS as senhas padrão em produção:

- `POSTGRES_PASSWORD`: Senha forte para o PostgreSQL
- `JWT_SECRET`: Use um gerador de senha seguro
- Todas as variáveis com valores de exemplo

## 🚀 Deploy

### Subir todos os serviços

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Verificar status dos containers

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Ver logs

```bash
# Todos os serviços
docker-compose -f docker-compose.prod.yml logs -f

# Apenas backend
docker-compose -f docker-compose.prod.yml logs -f backend

# Apenas frontend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## 📊 Estrutura de Serviços

A aplicação é composta por:

### Backend (NestJS)

- **Porta**: 3000
- **Database**: PostgreSQL
- **Cache**: Redis
- **Uploads**: Volume `backend_uploads`

### Frontend (React + Vite)

- **Porta**: 80 (nginx)
- **Build**: Otimizado para produção
- **Serving**: nginx com gzip e cache

### PostgreSQL

- **Volume**: `postgres_data`
- **Backup**: Automático via volume

### Redis

- **Volume**: `redis_data`
- **Persistência**: AOF habilitado

## 🔄 Operações Comuns

### Parar serviços

```bash
docker-compose -f docker-compose.prod.yml down
```

### Parar e remover volumes (⚠️ PERDE DADOS)

```bash
docker-compose -f docker-compose.prod.yml down -v
```

### Rebuild dos containers

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Atualizar aplicação

```bash
# Pull das mudanças
git pull

# Rebuild
docker-compose -f docker-compose.prod.yml up -d --build

# Aplicar migrations (se necessário)
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
```

## 🗄️ Database

### Executar migrations

```bash
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
```

### Acessar Prisma Studio

```bash
docker-compose -f docker-compose.prod.yml exec backend npx prisma studio
```

### Backup do banco

```bash
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U cubos cubos_interview > backup.sql
```

### Restaurar backup

```bash
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U cubos cubos_interview < backup.sql
```

## 🔍 Troubleshooting

### Verificar logs de erros

```bash
docker-compose -f docker-compose.prod.yml logs --tail=100 backend
```

### Restart de um serviço

```bash
docker-compose -f docker-compose.prod.yml restart backend
```

### Acessar shell do container

```bash
docker-compose -f docker-compose.prod.yml exec backend sh
```

## 📦 Volumes

Os dados são persistidos em volumes:

- `postgres_data`: Banco de dados PostgreSQL
- `redis_data`: Cache Redis
- `backend_uploads`: Arquivos enviados pelos usuários

Para backup completo:

```bash
docker run --rm -v cubos-interview_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

## 🔐 Segurança

- ✅ Use senhas fortes
- ✅ Configure HTTPS (recomendado usar nginx reverso)
- ✅ Restrinja acesso às portas
- ✅ Mantenha Docker e dependências atualizadas
- ✅ Configure firewall adequadamente
- ✅ Use variáveis de ambiente para secrets

## 📝 URLs

Após o deploy, a aplicação estará disponível em:

- **Frontend**: http://localhost:80 (ou porta configurada)
- **Backend API**: http://localhost:3000/api
- **API Docs**: http://localhost:3000/api/docs

## 🆘 Suporte

Em caso de problemas, verifique:

1. Logs dos containers
2. Variáveis de ambiente configuradas
3. Portas disponíveis
4. Volumes criados corretamente
