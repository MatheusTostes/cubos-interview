# Configuração do Redis para Agendamento de Emails

## Opções de Setup

### Opção 1: Docker (Recomendado)

#### Docker Compose

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

volumes:
  redis-data:
```

Execute:

```bash
docker-compose up -d
```

#### Docker direto

```bash
docker run -d -p 6379:6379 --name redis \
  -v redis-data:/data \
  redis:7-alpine redis-server --appendonly yes
```

### Opção 2: Redis Local (Windows)

Baixe e instale o Redis for Windows:

- https://github.com/tporadowski/redis/releases

Depois inicie o serviço:

```bash
redis-server
```

### Opção 3: Redis Cloud (Produção)

Para produção, use serviços gerenciados:

- **Redis Cloud**: https://redis.com/cloud
- **AWS ElastiCache**: Para AWS
- **Azure Cache for Redis**: Para Azure

## Configurar Persistência

### Redis com persistência AOF (Append Only File)

O comando usado no Docker já configura AOF:

```bash
redis-server --appendonly yes
```

Isso garante que os jobs agendados não sejam perdidos mesmo após restart.

## Variáveis de Ambiente

Adicione ao `.env`:

```env
# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Resend Email
RESEND_API_KEY=re_your_api_key_here
```

Para obter a API key do Resend:

1. Acesse https://resend.com
2. Crie uma conta gratuita
3. Vá em "API Keys" e gere uma nova key
4. Adicione ao `.env`

## Testar o Sistema

1. **Inicie o Redis**:

```bash
docker-compose up -d
```

2. **Inicie o backend**:

```bash
cd backend
yarn dev
```

3. **Crie um filme com data futura**: A API irá agendar automaticamente um email para a data de lançamento.

4. **Verificar jobs agendados**:

```bash
# Dentro do container Redis
redis-cli

# Listar todas as chaves
KEYS *

# Ver job específico
GET bull:movie-notifications:*
```

## Monitoramento

### Instalar Bull Board (Dashboard)

```bash
yarn add @nestjs/bullmq bull-board
```

Crie um módulo de monitoramento para ver os jobs em tempo real.

## Troubleshooting

### Redis não conecta

```bash
# Verificar se está rodando
docker ps | grep redis

# Ver logs
docker logs redis
```

### Jobs não são processados

- Verifique se o `MovieNotificationProcessor` está registrado no módulo
- Confirme que o Redis está configurado corretamente
- Verifique os logs do backend

### Email não é enviado

- Confirme que `RESEND_API_KEY` está configurado
- Verifique se o email do usuário está correto
- Veja os logs do `EmailService`


