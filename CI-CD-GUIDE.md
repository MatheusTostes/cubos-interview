# 🚀 CI/CD com GitHub Actions + VPS Contabo

Guia para configurar deploy automático usando GitHub Actions (gratuito) + VPS da Contabo.

## 📋 Pré-requisitos

- ✅ Conta GitHub (gratuita)
- ✅ VPS na Contabo com Docker instalado
- ✅ Acesso SSH à VPS
- ✅ Domínio (opcional, pode usar IP)

## 🔧 Configuração da VPS

### 1. Instalar Docker na VPS

```bash
# Conectar na VPS
ssh root@SEU_IP_VPS

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verificar instalação
docker --version
docker-compose --version
```

### 2. Configurar Firewall

```bash
# Permitir portas necessárias
ufw allow 22    # SSH
ufw allow 80    # Frontend
ufw allow 3000  # Backend (opcional, só para testes)
ufw allow 5432  # PostgreSQL (opcional, só se precisar acessar externamente)
ufw enable
```

### 3. Criar usuário para deploy (opcional, mais seguro)

```bash
# Criar usuário
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy

# Configurar SSH key para o usuário
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
# Copiar sua chave pública para authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

## 🔑 Configurar Secrets no GitHub

### 1. Acessar Secrets

1. Vá no seu repositório GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique **"New repository secret"**

### 2. Adicionar Secrets

| Secret         | Descrição              | Exemplo                             |
| -------------- | ---------------------- | ----------------------------------- |
| `VPS_HOST`     | IP da sua VPS          | `123.456.789.123`                   |
| `VPS_USERNAME` | Usuário SSH            | `root` ou `deploy`                  |
| `VPS_SSH_KEY`  | Chave privada SSH      | Conteúdo do arquivo `~/.ssh/id_rsa` |
| `VPS_PORT`     | Porta SSH              | `22`                                |
| `VITE_API_URL` | URL da API em produção | `http://123.456.789.123:3000/api`   |

### 3. Gerar chave SSH (se não tiver)

```bash
# No seu computador local
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copiar chave pública para VPS
ssh-copy-id -i ~/.ssh/id_rsa.pub root@SEU_IP_VPS

# Copiar chave privada para GitHub Secret VPS_SSH_KEY
cat ~/.ssh/id_rsa
```

## ⚙️ Configurar Variáveis de Ambiente

### 1. Criar arquivo .env na VPS

```bash
# Na VPS
cd /opt/cubos-interview
cp .env.example .env
nano .env
```

### 2. Configurar variáveis

```env
# Database
DATABASE_URL="postgresql://cubos:cubos123@postgres:5432/cubos_interview"
POSTGRES_PASSWORD="cubos123"

# JWT
JWT_SECRET="sua-chave-jwt-super-secreta"

# Redis
REDIS_HOST="redis"
REDIS_PORT="6379"

# Cloudflare R2
R2_PUBLIC_URL="https://pub-xxxxxxxxxxx.r2.dev"
R2_ENDPOINT="https://xxxxxxxxxxx.r2.cloudflarestorage.com"
R2_BUCKET_NAME="cubos-movies"
R2_ACCESS_KEY_ID="sua-access-key"
R2_SECRET_ACCESS_KEY="sua-secret-key"

# Resend
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FRONTEND_URL="http://SEU_IP_VPS:80"

# Backend
PORT="3000"
HOST="0.0.0.0"
NODE_ENV="production"
```

## 🚀 Como Funciona o Deploy

### 1. Trigger

- Push na branch `master` → Deploy automático
- Pull Request → Build de teste (sem deploy)

### 2. Processo

1. **Build**: Instala dependências e compila frontend/backend
2. **Package**: Cria pacote com arquivos compilados
3. **Upload**: Envia arquivos para VPS via SCP
4. **Deploy**: Para containers, extrai arquivos, sobe novos containers
5. **Migration**: Executa migrations do banco
6. **Verification**: Verifica se serviços estão rodando

### 3. URLs após deploy

- **Frontend**: `http://SEU_IP_VPS:80`
- **Backend**: `http://SEU_IP_VPS:3000/api`
- **API Docs**: `http://SEU_IP_VPS:3000/api/docs`

## 🔍 Monitoramento

### Ver logs do deploy

```bash
# Na VPS
cd /opt/cubos-interview
docker-compose -f docker-compose.prod.yml logs -f
```

### Verificar status dos containers

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Backup manual do banco

```bash
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U cubos cubos_interview > backup-$(date +%Y%m%d).sql
```

## 🛠️ Troubleshooting

### Deploy falha

1. Verificar logs no GitHub Actions
2. Verificar se secrets estão corretos
3. Testar conexão SSH manualmente

### Containers não sobem

1. Verificar arquivo .env
2. Verificar se portas estão livres
3. Verificar logs: `docker-compose logs`

### Banco não conecta

1. Verificar se PostgreSQL está rodando
2. Verificar DATABASE_URL
3. Verificar se migrations foram executadas

## 💰 Custos

- **GitHub Actions**: Gratuito (2000 minutos/mês)
- **VPS Contabo**: ~€3-5/mês
- **Domínio**: Opcional, ~$10/ano

## 🔒 Segurança

- ✅ Use usuário não-root para deploy
- ✅ Configure firewall adequadamente
- ✅ Use HTTPS em produção (certificado Let's Encrypt)
- ✅ Mantenha Docker e dependências atualizadas
- ✅ Configure backup automático do banco
