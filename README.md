# Nimble

A hybrid B2B + B2C Printing SaaS Platform built with a modern TypeScript monorepo architecture.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + Tailwind CSS
- **Backend API**: NestJS + TypeScript
- **Worker**: BullMQ for background jobs
- **Database**: PostgreSQL + Prisma ORM
- **Package Manager**: pnpm (workspace monorepo)

## 📁 Project Structure

```
nimble/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   ├── api/          # NestJS backend API (port 4000)
│   └── worker/       # Background job worker (BullMQ)
├── packages/
│   ├── core/         # Shared types and DTOs
│   └── utils/        # Shared utilities
├── prisma/
│   └── schema.prisma # Database schema (multi-tenant)
└── package.json      # Root package.json
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 20+
- pnpm 9.0.0+
- PostgreSQL (for production)
- Redis (for worker queues)

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client (requires DATABASE_URL)
pnpm db:generate

# Run database migrations (requires DATABASE_URL)
pnpm db:migrate
```

## 🏃 Development

### Start all services

```bash
# Start web, api, and worker concurrently
pnpm dev
```

### Start individual services

```bash
# Web app (Next.js)
pnpm dev:web

# API server (NestJS)
pnpm dev:api

# Worker service (BullMQ)
pnpm dev:worker
```

## 🧪 Testing & Building

```bash
# Run all tests
pnpm test

# Run linters
pnpm lint

# Build all packages
pnpm build
```

## 📦 Database

The platform uses a multi-tenant architecture with Row-Level Security (RLS). Key models include:

- **Tenant**: Multi-tenant isolation with subdomain support
- **User & Membership**: User management with role-based access
- **Product**: Configurable print products with dynamic pricing
- **Order**: B2C and B2B order management
- **Job**: Production workflow tracking
- **Integration**: Third-party platform connectors (Shopify, WooCommerce, etc.)

### Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Create and run migrations
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio
```

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nimble

# Redis (for worker queues)
REDIS_URL=redis://localhost:6379

# API Configuration
API_URL=http://localhost:4000
WEB_URL=http://localhost:3000

# See .env.example for complete list
```

## 📝 API Endpoints

Once the API is running, visit:
- http://localhost:4000 - API root endpoint

## 🌐 Web Application

Once the web app is running, visit:
- http://localhost:3000 - Main application

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [BullMQ Documentation](https://docs.bullmq.io)

## 🤝 Contributing

This is a private project. For development guidelines, please refer to the internal documentation.

## 📄 License

Private and proprietary.
