# Vet Platform

Sistema de gestao veterinaria fullstack com foco em arquitetura limpa, regras de negocio claras e seguranca. Monorepo com Turbo, backend em Node.js + Express + Prisma + MongoDB e frontend em Next.js (App Router).

## Objetivo

- Gerenciar tutores, animais e atendimentos
- Autenticacao admin-only com JWT
- Estrutura preparada para evoluir em produto SaaS

## Estrutura do Monorepo

```
apps/
  api/  # backend
  web/  # frontend
packages/
  eslint-config/
  typescript-config/
```

## Backend (apps/api)

### Stack

- Node.js + Express
- TypeScript
- Prisma ORM (v6)
- MongoDB (Replica Set)
- JWT + bcryptjs

### Arquitetura (Clean Architecture simplificada)

- domain: entidades e contratos
- application: use cases, services, errors
- infra: Prisma e repositorios concretos
- presentation: controllers, routes, middlewares
- main: bootstrap do servidor

### Modelos de Dominio

- Tutor
- Animal
- Atendimento
- Admin

### Regras de Negocio (resumo)

- Animal so pode ser criado com tutor existente
- Tutor nao pode ser deletado se tiver animais
- Email de tutor e unico
- Validacoes basicas de campos obrigatorios
- Autenticacao admin-only com role

### Rotas

- Publicas:
  - GET /health
  - POST /auth/admin
  - POST /auth/login
- Protegidas:
  - /tutors
  - /animals

### Variaveis de ambiente (apps/api/.env)

```
PORT=3001
DATABASE_URL="mongodb://localhost:27017/vet_platform?replicaSet=rs0"
JWT_SECRET="vet-platform-dev-secret"
JWT_EXPIRES_IN="1d"
BCRYPT_SALT_ROUNDS=10
```

### MongoDB via Docker

```
docker run -d -p 27017:27017 --name vet-mongo mongo:7 --replSet rs0
docker exec -it vet-mongo mongosh
rs.initiate()
```

### Rodar backend

```
cd apps/api
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Health check:

```
GET http://localhost:3001/health
```

## Frontend (apps/web)

### Status

Frontend em fase de construcao (MVP). A base e Next.js App Router com Tailwind.

### Variavel de ambiente (apps/web/.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Rodar frontend

```
cd apps/web
npm install
npm run dev
```

## Roadmap (resumo)

- MVP frontend: login, dashboard, CRUD de tutores/animais/atendimentos
- Observabilidade: logs, auditoria, toasts, loading states
- Evolucao: roles, multi-clinica, pipelines, deploy
