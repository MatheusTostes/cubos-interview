# Backend - Cubos Interview

Backend desenvolvido com **NestJS**, **Prisma**, **JWT** e **Swagger** para documentação automática da API.

## 🏗️ Arquitetura Feature-Based

O projeto está organizado por features, facilitando a manutenção e escalabilidade:

```
src/
├── features/          # Features do sistema
│   ├── auth/         # Autenticação (login/register)
│   ├── users/        # Gerenciamento de usuários
│   └── movies/       # Gerenciamento de filmes
├── shared/           # Código compartilhado
│   ├── prisma/       # Configuração do Prisma
│   ├── guards/       # Guards do NestJS
│   └── decorators/   # Decorators customizados
├── app.module.ts     # Módulo principal
└── main.ts           # Entry point
```

## 🚀 Tecnologias

- **NestJS** - Framework Node.js com TypeScript
- **Prisma** - ORM para banco de dados
- **JWT** - Autenticação com tokens
- **Swagger** - Documentação automática da API
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Yarn

### Passos

```bash
# 1. Subir o PostgreSQL com Docker (na pasta raiz do projeto)
cd ..
docker-compose up -d
cd backend

# 2. Instalar dependências
yarn install

# 3. Copiar arquivo de ambiente
cp .env.example .env

# 4. Gerar Prisma Client
yarn prisma:generate

# 5. Criar banco de dados e rodar migrations
yarn prisma:migrate

# 6. (Opcional) Popular o banco com dados de exemplo
yarn prisma:seed
```

## 🏃 Rodando o projeto

### Desenvolvimento

```bash
# Subir o PostgreSQL (se não estiver rodando)
docker-compose up -d

# Iniciar o servidor em modo desenvolvimento
yarn dev
```

### Parar o PostgreSQL

```bash
# Na pasta raiz do projeto
docker-compose down
```

### Produção

```bash
yarn build
yarn start:prod
```

## 📝 Endpoints

### Autenticação (Públicas)

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### Usuários (Protegidas)

- `GET /api/users/me` - Obter perfil do usuário logado

### Filmes (Protegidas)

- `POST /api/movies` - Criar filme
- `GET /api/movies` - Listar filmes (com paginação)
- `GET /api/movies/:id` - Obter filme por ID
- `PATCH /api/movies/:id` - Atualizar filme
- `DELETE /api/movies/:id` - Deletar filme

## 📚 Documentação Swagger

Acesse a documentação completa da API em:

```
http://localhost:8080/api/docs
```

## 🔐 Autenticação

O sistema usa **JWT** para autenticação. Para acessar rotas protegidas:

### Via Swagger

1. Acesse `http://localhost:8080/api/docs`
2. Faça login em `POST /api/auth/login`
3. Copie o `access_token` retornado
4. Clique em "Authorize" (🔓 no topo da página)
5. Cole o token no campo "JWT-auth"
6. Clique em "Authorize"

### Via HTTP Request

**Headers:**

```
Authorization: Bearer <seu-token-jwt>
```

**Exemplo com curl:**

```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer seu-token-aqui"
```

### Criando um usuário de teste

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","name":"Teste","password":"123456"}'
```

Ou use o arquivo de seed:

```bash
yarn prisma:seed
```

Login: `test@example.com` / Senha: `password123`

## 🗄️ Banco de Dados

### PostgreSQL com Docker

O projeto usa **PostgreSQL** rodando em um container Docker.

**Iniciar os serviços (na pasta raiz do projeto):**

```bash
cd ..
docker-compose up -d
cd backend
```

**Parar os serviços:**

```bash
docker-compose down
```

**Ver logs:**

```bash
docker-compose logs postgres
docker-compose logs pgadmin
```

**Resetar o banco (apaga todos os dados):**

```bash
docker-compose down -v
docker-compose up -d
cd backend
yarn prisma:migrate
```

### pgAdmin - Interface Web para o Banco

O pgAdmin está disponível em: `http://localhost:5050`

**Credenciais:**

- Email: `admin@cubos.com`
- Senha: `admin123`

**Para conectar ao PostgreSQL:**

1. Faça login no pgAdmin
2. Clique com botão direito em "Servers" → "Register" → "Server"
3. Na aba "General":
   - Name: `Cubos Interview`
4. Na aba "Connection":
   - Host: `postgres`
   - Port: `5432`
   - Database: `cubos_interview`
   - Username: `cubos`
   - Password: `cubos123`
5. Clique em "Save"

### Ferramentas de Visualização do Banco

**pgAdmin (Interface Web):**

```bash
# Acesse: http://localhost:5050
# Login: admin@cubos.com / admin123
```

**Prisma Studio (Terminal):**

```bash
yarn prisma:studio
# Acesse: http://localhost:5555
```

### Estrutura do Banco

- **users** - Tabela de usuários
- **movies** - Catálogo de filmes
- **genres** - Gêneros de filmes
- **movie_genres** - Relação muitos-para-muitos (filmes ⇄ gêneros)
- **user_movies** - Relação de usuários com filmes (assistido, avaliação)

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
yarn dev              # Rodar em modo watch
yarn start:debug      # Rodar com debug
yarn start            # Rodar produção local
```

### Database

```bash
yarn prisma:generate  # Gerar Prisma Client
yarn prisma:migrate   # Criar/rodar migrations
yarn prisma:studio    # Abrir Prisma Studio
yarn prisma:seed      # Popular banco com dados
```

### Docker

```bash
docker-compose up -d         # Iniciar PostgreSQL (raiz do projeto)
docker-compose down          # Parar PostgreSQL
docker-compose logs postgres # Ver logs
docker-compose ps            # Ver status
```

### Testes

```bash
yarn test            # Rodar testes
yarn test:watch      # Testes em modo watch
yarn test:e2e        # Testes end-to-end
```

## 🏗️ Arquitetura

### Estrutura Feature-Based

```
src/
├── features/
│   ├── auth/              # Autenticação
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── strategies/    # Estratégias Passport
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/             # Usuários
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── movies/            # Filmes
│       ├── dto/
│       ├── movies.controller.ts
│       ├── movies.service.ts
│       └── movies.module.ts
├── shared/                # Código compartilhado
│   ├── prisma/           # Serviço Prisma (global)
│   ├── guards/           # Guards de autenticação
│   └── decorators/       # Decorators customizados
└── app.module.ts         # Módulo raiz
```

### Fluxo de Autenticação

1. **Login/Register** → Retorna JWT token
2. **Todas as rotas** (exceto `/auth/*`) → Requerem JWT no header
3. **Guard Global** → Verifica token em todas as rotas
4. **Decorator @Public()** → Marca rotas como públicas
5. **Decorator @CurrentUser()** → Injeta usuário autenticado

### Decisões Arquiteturais

**Por que NestJS?**

- Suporte nativo ao TypeScript
- Decorators para organização clara
- Swagger integrado e automático
- Arquitetura modular escalável
- Injeção de dependências robusta

**Por que Prisma?**

- Type-safe queries
- Migrations automáticas
- Prisma Studio para visualização
- Suporte a múltiplos bancos

**Por que Feature-Based?**

- Separar responsabilidades por domínio
- Fácil manutenção e testes
- Escalável para equipes grandes
- Código organizado e limpo

## 🚨 Troubleshooting

### PostgreSQL não conecta

```bash
# Verificar se o container está rodando (na raiz do projeto)
docker-compose ps

# Iniciar o container
docker-compose up -d

# Ver logs de erro
docker-compose logs postgres
```

### Erro no Prisma

```bash
# Regenerar o Prisma Client
yarn prisma:generate

# Resetar o banco
docker-compose down -v
docker-compose up -d
yarn prisma:migrate
```

### Porta 8080 já está em uso

Altere a porta em `.env`:

```
PORT=3001
```

### Formatação automática ao salvar não funciona

**Verifique se a extensão Prettier está instalada:**

- No VS Code, vá em Extensions (Ctrl+Shift+X)
- Procure por "Prettier - Code formatter"
- Instale se não estiver instalado

**Recarregue o VS Code:**

- `Ctrl+Shift+P` → "Reload Window"

**Forçar formatação manual:**

```bash
yarn format
```

## 🎯 Próximos Passos

- [ ] Adicionar testes unitários e E2E
- [ ] Implementar sistema de avaliações
- [ ] Histórico de visualização
- [ ] Upload de imagens (S3/local)
- [ ] Filtros avançados de filmes
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Logs estruturados
- [ ] CI/CD pipeline

## 📄 Licença

MIT
