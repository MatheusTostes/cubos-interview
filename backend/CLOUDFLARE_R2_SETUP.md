# Setup Cloudflare R2

## 1. Criar as Credenciais de API

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **R2** → Clique no seu bucket
3. Vá em **Settings** → Role em "R2 API Token"
4. Clique em **"Create API Token"**
5. Configure:
   - **Token name**: `cubos-movies-api`
   - **TTL**: Deixe em branco (sem expiração) ou configure conforme necessário
   - **Permissions**: Read & Write
   - **Bucket**: Selecione seu bucket `cubos-movies`
6. Clique em **"Create API Token"**
7. **IMPORTANTE**: Copie e guarde:
   - `Access Key ID`
   - `Secret Access Key`

⚠️ **Não perca essas credenciais!** Você só verá o Secret Access Key uma vez.

## 2. Obter o Endpoint do R2

No mesmo lugar onde você criou a API Token, você encontrará o **Endpoint**:

- Tem o formato: `https://<account-id>.r2.cloudflarestorage.com`

## 3. Configurar no backend

Adicione ao arquivo `.env` do backend:

```env
# URL pública do seu bucket R2 (para acessar os arquivos)
R2_PUBLIC_URL="https://pub-9ebfed913b894a9480d9ad399ae4d639.r2.dev"

# Endpoint do R2 (para fazer upload via API)
R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"

# Nome do bucket
R2_BUCKET_NAME="cubos-movies"

# Credenciais da API Token (que você criou acima)
R2_ACCESS_KEY_ID="sua-access-key-id"
R2_SECRET_ACCESS_KEY="sua-secret-access-key"
```

## 4. Como funciona

- **R2_PUBLIC_URL**: URL usada para acessar as imagens publicamente (para o frontend)
- **R2_ACCESS_KEY_ID**: Usado para autenticar o upload de imagens
- **R2_SECRET_ACCESS_KEY**: Usado para autenticar o upload de imagens

## 5. Testar

Após configurar, rode as migrations e teste o endpoint de upload:

```bash
cd backend
yarn prisma:migrate
yarn dev
```

Testar no Swagger: `http://localhost:3000/api/docs` → `/api/upload/image`
