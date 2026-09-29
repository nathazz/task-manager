# Task Manager Backend

Express/TypeScript backend for the Task Manager application.

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Clerk
- Zod
- tsx
- nodemon

## API

```text
GET    /health
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

Task endpoints use authentication through Clerk.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The backend normally runs on:

```text
http://localhost:8080
```

## Docker

The backend includes a `Dockerfile` configured for development.

The development container uses the Node.js development workflow with TypeScript and the configured `tsx`/`nodemon` tooling.

The PostgreSQL database can run separately through Docker Compose.

## Environment variables

```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:51213/task_manager_db?schema=public
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLIENT_ORIGIN=http://localhost:3000
```

When the backend runs inside Docker, `localhost` in `DATABASE_URL` refers to the backend container itself. If PostgreSQL is another Compose service, use the database service name as the hostname.

## Database

Prisma is used for database access.

The `Task` model contains:

- `id`
- `title`
- `description`
- `status`
- `userId`
- `createdAt`
- `updatedAt`

The database enforces one task title per user:

```prisma
@@unique([userId, title])
```

## Architecture

The backend is organized into:

- routes
- controllers
- services
- repositories
- Prisma/database access
- validation
- authentication middleware

Controllers deal with HTTP requests/responses. Services contain application logic. Repositories handle persistence.

## Error handling

The API uses HTTP status codes for validation, authentication, missing resources and conflicts.

For example, attempting to create a duplicate task title for the same user violates the database unique constraint and should be exposed to the frontend as a conflict (`409`).

---
PTBR 🇧🇷

# Task Manager Backend

Backend em Express/TypeScript para a aplicação Task Manager.

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Clerk
- Zod
- tsx
- nodemon

## API

```text
GET    /health
GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

Os endpoints de tarefas utilizam autenticação através do Clerk.

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Normalmente o backend fica disponível em:

```text
http://localhost:8080
```

## Docker

O backend possui um `Dockerfile` configurado para desenvolvimento.

O container de desenvolvimento utiliza o fluxo de desenvolvimento do Node.js com TypeScript e as ferramentas `tsx`/`nodemon` configuradas no projeto.

O PostgreSQL pode ser executado separadamente através do Docker Compose.

## Variáveis de ambiente

```env
PORT=8080
DATABASE_URL=postgresql://postgres:postgres@localhost:51213/task_manager_db?schema=public
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLIENT_ORIGIN=http://localhost:3000
```

Quando o backend estiver rodando dentro do Docker, `localhost` em `DATABASE_URL` se refere ao próprio container do backend. Se o PostgreSQL estiver em outro serviço do Compose, utilize o nome do serviço do banco como hostname.

## Banco de dados

O Prisma é utilizado para acessar o banco.

O modelo `Task` possui:

- `id`
- `title`
- `description`
- `status`
- `userId`
- `createdAt`
- `updatedAt`

O banco garante que cada usuário tenha apenas uma tarefa com determinado título:

```prisma
@@unique([userId, title])
```

## Arquitetura

O backend é organizado em:

- routes
- controllers
- services
- repositories
- acesso ao Prisma/banco
- validação
- middleware de autenticação

Os controllers cuidam das requisições/respostas HTTP. Os services contêm a lógica da aplicação. Os repositories cuidam da persistência.

## Tratamento de erros

A API utiliza códigos HTTP para validação, autenticação, recursos inexistentes e conflitos.

Por exemplo, tentar criar uma tarefa com título duplicado para o mesmo usuário viola a constraint unique do banco e deve ser exposto ao frontend como conflito (`409`).
