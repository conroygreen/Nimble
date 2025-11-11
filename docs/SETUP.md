# Setup

This MVP uses a Node.js monorepo with npm workspaces.

Prereqs
- Node.js 20+
- Docker (for Postgres/Redis)

1) Start infrastructure

```
docker compose up -d
```

2) Copy env

```
cp .env.example .env
cp .env.example prisma/.env
```

> Note: The Prisma CLI requires the `.env` file in the `prisma/` directory when using the `--schema` flag.

3) Install dependencies (at repo root)

```
npm install
```

4) Generate Prisma client, run migrations, and seed

```
# from apps/api
npm run -w apps/api prisma:generate
npm run -w apps/api prisma:migrate -- --name init
npm run -w apps/api prisma:seed
```

5) Run services

```
# API
npm run -w apps/api start:dev

# Frontend
npm run -w apps/web dev

# Worker
npm run -w apps/worker dev
```

6) Try it
- API: http://localhost:3001/health -> { status: ok }
- Frontend: http://localhost:3000 -> lists products (after API running)

Notes
- Dev auth is stubbed; set X-Tenant-Id/X-User-Id headers for tenant scoping where needed.
- Configure AWS and Stripe envs before using presigned uploads and checkout in earnest.
