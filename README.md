# Task Manager

Full-stack task manager with a Next.js frontend and an Express/TypeScript backend.

## Project structure

```text
task-manager/
├── frontend/
│   ├── Dockerfile
│   └── ...
├── backend/
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml
```

## Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- TanStack Query
- Axios

### Backend
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Clerk
- Zod
- tsx / nodemon

### Infrastructure
- Docker
- Docker Compose
- PostgreSQL

## Features

- Clerk authentication
- Create, edit and delete tasks
- Task details modal
- Task status management
- Drag-and-drop between status columns
- Task validation
- API error handling
- PostgreSQL persistence
- Development containers for both frontend and backend

## Task statuses

The application supports:

- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `COMPLETED`

## Backend API

```text
GET    /health
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

Task routes require authentication.

## Swagger

The backend exposes interactive API documentation through Swagger UI.
When running the application locally, open:

http://localhost:8080/docs

## Docker development

Both the frontend and backend have their own `Dockerfile` intended for development.

The PostgreSQL database is also available through Docker Compose.

Typical development setup:

```bash
docker compose up -d
```

Then start the frontend and backend development containers according to their Dockerfiles / compose configuration.

## Environment variables

Frontend:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Backend:

```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:51213/task_manager_db?schema=public
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLIENT_ORIGIN=http://localhost:3000
```

## Database

PostgreSQL is exposed locally on port `51213` and the application uses Prisma for database access.

The `Task` model contains:

- `id`
- `title`
- `description`
- `status`
- `userId`
- `createdAt`
- `updatedAt`

A task title is unique per user through:

```prisma
@@unique([userId, title])
```

## Frontend architecture

The frontend separates responsibilities into:

- API functions
- React Query hooks
- UI components
- task/status helpers
- shared types
- authentication/context providers

React Query handles task fetching, mutations and cache invalidation.

## Backend architecture

The backend separates responsibilities into:

- routes
- controllers
- services
- repositories
- Prisma/database access
- validation
- authentication middleware

Controllers handle HTTP concerns, services contain application logic, and repositories handle persistence.

## Running locally

Install dependencies in both applications and configure the environment variables.

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Then run the frontend and backend development servers, or use their development Dockerfiles.

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```

---

PTBR 🇧🇷

# Task Manager

Aplicação full-stack de gerenciamento de tarefas com frontend em Next.js e backend em Express/TypeScript.

## Estrutura do projeto

```text
task-manager/
├── frontend/
│   ├── Dockerfile
│   └── ...
├── backend/
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml
```

## Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- TanStack Query
- Axios

### Backend
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Clerk
- Zod
- tsx / nodemon

### Infraestrutura
- Docker
- Docker Compose
- PostgreSQL

## Funcionalidades

- Autenticação com Clerk
- Criar, editar e excluir tarefas
- Modal para visualizar detalhes da tarefa
- Gerenciamento de status
- Drag-and-drop entre colunas
- Validação dos dados
- Tratamento de erros da API
- Persistência no PostgreSQL
- Containers de desenvolvimento para frontend e backend

## Status das tarefas

A aplicação suporta:

- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `COMPLETED`

## API do backend

```text
GET    /health
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

As rotas de tarefas exigem autenticação.

# Swagger

O backend disponibiliza uma documentação interativa da API através do
Swagger UI.

Quando a aplicação estiver rodando localmente:
http://localhost:8080/docs

## Desenvolvimento com Docker

Tanto o frontend quanto o backend possuem seus próprios `Dockerfile`, destinados ao ambiente de desenvolvimento.

O PostgreSQL também pode ser executado através do Docker Compose.

Configuração típica:

```bash
docker compose up -d
```

Depois, execute os containers de desenvolvimento do frontend e do backend de acordo com seus respectivos Dockerfiles/configurações do Compose.

## Variáveis de ambiente

Frontend:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Backend:

```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:51213/task_manager_db?schema=public
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLIENT_ORIGIN=http://localhost:3000
```

## Banco de dados

O PostgreSQL fica disponível localmente na porta `51213` e a aplicação utiliza Prisma para acessar o banco.

O modelo `Task` possui:

- `id`
- `title`
- `description`
- `status`
- `userId`
- `createdAt`
- `updatedAt`

O título de uma tarefa é único por usuário através de:

```prisma
@@unique([userId, title])
```

## Arquitetura do frontend

O frontend separa as responsabilidades entre:

- funções de API
- hooks do React Query
- componentes de UI
- helpers de tarefas/status
- tipos compartilhados
- providers de autenticação/contexto

O React Query é responsável pelas consultas, mutations e invalidação do cache.

## Arquitetura do backend

O backend separa as responsabilidades entre:

- rotas
- controllers
- services
- repositories
- acesso ao Prisma/banco
- validação
- middleware de autenticação

Os controllers cuidam das responsabilidades HTTP, os services da lógica da aplicação e os repositories da persistência.

## Execução local

Instale as dependências nas duas aplicações e configure as variáveis de ambiente.

Inicie o PostgreSQL:

```bash
docker compose up -d postgres
```

Depois, execute os servidores de desenvolvimento do frontend e do backend ou utilize os respectivos Dockerfiles de desenvolvimento.

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```
