# Task Manager Frontend

Next.js frontend for the Task Manager application.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- TanStack Query
- Axios

## Features

- Authentication with Clerk
- Task board
- Task creation and editing
- Task details modal
- Task deletion confirmation
- Drag-and-drop status changes
- Loading and mutation states
- API error messages

## Task statuses

```text
TODO
IN_PROGRESS
IN_REVIEW
COMPLETED
```

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

The application normally runs on:

```text
http://localhost:3000
```

## Docker

The frontend includes a `Dockerfile` configured for development.

The development container should run the Next.js development server and expose port `3000`.

The application uses:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

When the frontend runs inside Docker, make sure the API URL and network configuration allow the browser to reach the backend correctly.

## Architecture

Main responsibilities are separated into:

- `api/` — HTTP requests
- `hooks/` — React Query hooks
- `components/` — UI
- `helpers/` — task/status helpers
- `types/` — TypeScript models
- `context/` — shared providers

React Query is used to fetch tasks and perform create/update/delete mutations. Successful mutations invalidate the task queries so the board refreshes with server data.


---
PTBR 🇧🇷

# Task Manager Frontend

Frontend em Next.js para a aplicação Task Manager.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk
- TanStack Query
- Axios

## Funcionalidades

- Autenticação com Clerk
- Quadro de tarefas
- Criação e edição de tarefas
- Modal de detalhes da tarefa
- Confirmação para exclusão
- Alteração de status via drag-and-drop
- Estados de loading e mutations
- Mensagens de erro da API

## Status das tarefas

```text
TODO
IN_PROGRESS
IN_REVIEW
COMPLETED
```

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Execute localmente:

```bash
npm run dev
```

Normalmente a aplicação fica disponível em:

```text
http://localhost:3000
```

## Docker

O frontend possui um `Dockerfile` configurado para desenvolvimento.

O container de desenvolvimento deve executar o servidor de desenvolvimento do Next.js e expor a porta `3000`.

A aplicação utiliza:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

Quando o frontend estiver rodando dentro do Docker, certifique-se de que a URL da API e a configuração de rede permitam que o navegador alcance o backend corretamente.

## Arquitetura

As principais responsabilidades são separadas entre:

- `api/` — requisições HTTP
- `hooks/` — hooks do React Query
- `components/` — UI
- `helpers/` — helpers de tarefas/status
- `types/` — modelos TypeScript
- `context/` — providers compartilhados

O React Query é usado para buscar tarefas e executar mutations de criação, atualização e exclusão. Após mutations bem-sucedidas, as queries de tarefas são invalidadas para atualizar o quadro com os dados do servidor.
