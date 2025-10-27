# Configuração R2 no Docker

## Variáveis de Ambiente Necessárias

Quando rodar o backend no Docker, você precisará dessas variáveis:

```env
# Cloudflare R2
R2_PUBLIC_URL="https://pub-xxxxxxxxxxx.r2.dev"
R2_ADDRESS="https://xxxxxxxxxxx.r2.cloudflarestorage.com"
R2_BUCKET_NAME="cubos-movies"
R2_ACCESS_KEY_ID="xxxxxxxxxxx"
R2_SECRET_ACCESS_KEY="xxxxxxxxxxx"
```

## Adicionando ao docker-compose.yml

Copie o serviço `backend` do arquivo `docker-compose.example.yml` e ajuste as variáveis conforme seu ambiente.

### Opção 1: Adicionar diretamente no docker-compose.yml

```yaml
backend:
  build: ./backend
  environment:
    R2_PUBLIC_URL: 'https://pub-xxxxxxxxxxx.r2.dev'
    R2_ADDRESS: 'https://xxxxxxxxxxx.r2.cloudflarestorage.com'
    R2_BUCKET_NAME: 'cubos-movies'
    R2_ACCESS_KEY_ID: 'sua-access-key'
    R2_SECRET_ACCESS_KEY: 'sua-secret-key'
```

### Opção 2: Usar arquivo .env

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione as variáveis R2 lá
3. No docker-compose.yml, use:

```yaml
backend:
  build: ./backend
  env_file:
    - .env
```

## R2_TOKEN

O `R2_TOKEN` que você mencionou não é usado diretamente na aplicação. É apenas uma informação de autenticação do dashboard do Cloudflare.

Use apenas:

- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
