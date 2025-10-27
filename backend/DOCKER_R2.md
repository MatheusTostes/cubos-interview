# Configuração R2 no Docker

## Variáveis de Ambiente Necessárias

Quando rodar o backend no Docker, você precisará dessas variáveis:

```env
# Cloudflare R2
R2_PUBLIC_URL="https://pub-9ebfed913b894a9480d9ad399ae4d639.r2.dev"
R2_ADDRESS="https://0b56a0b0443bced3627f43e926640543.r2.cloudflarestorage.com"
R2_BUCKET_NAME="cubos-movies"
R2_ACCESS_KEY_ID="05361bd721110f6eed645bd7519e9a3d"
R2_SECRET_ACCESS_KEY="b0386da21046c73a4da310eb2f68bc58f237e6ec350740b0b93057141924e1fe"
```

## Adicionando ao docker-compose.yml

Copie o serviço `backend` do arquivo `docker-compose.example.yml` e ajuste as variáveis conforme seu ambiente.

### Opção 1: Adicionar diretamente no docker-compose.yml

```yaml
backend:
  build: ./backend
  environment:
    R2_PUBLIC_URL: 'https://pub-9ebfed913b894a9480d9ad399ae4d639.r2.dev'
    R2_ADDRESS: 'https://0b56a0b0443bced3627f43e926640543.r2.cloudflarestorage.com'
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
