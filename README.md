# Nimble - Hybrid B2B + B2C Printing SaaS Platform

A multi-tenant, white-label web platform for printing companies to sell custom print products to both consumers (B2C) and business clients (B2B).

## 🎯 Features

- **Multi-Tenant Architecture**: Each printing company gets their own branded subdomain
- **Product Configurator**: Dynamic pricing with live calculations based on options and quantity
- **Complete Order Workflow**: NEW → PREFLIGHT → PRESS → FINISH → SHIPPED
- **File Management**: Secure S3 uploads with automated preflight checks
- **Stripe Integration**: Payment processing and subscription billing
- **Admin Dashboards**: Tenant management and SaaS owner controls
- **Worker Queue**: Async processing for preflight, thumbnails, and notifications

## 🏗️ Architecture

This is a monorepo containing:

```
/apps
  /web       - Next.js 14 frontend (Tailwind + shadcn/ui)
  /api       - NestJS backend API
  /worker    - BullMQ async workers
/packages
  /core      - Shared types and validation schemas
  /utils     - Logging and utilities
  /ui        - Shared UI components
/prisma      - Database schema and migrations
/docs        - Documentation
```

## 🚀 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, Prisma, PostgreSQL
- **Auth**: Clerk
- **Payments**: Stripe
- **Storage**: AWS S3
- **Queue**: BullMQ + Redis
- **Hosting**: Vercel (frontend) + Railway/AWS (backend)

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- AWS Account (for S3)
- Stripe Account

## ⚡ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Setup database**
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Access the platform**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed installation and configuration
- [API Documentation](./docs/API.md) - REST API reference
- [Architecture](./docs/ARCHITECTURE.md) - System design and patterns

## 🎨 Demo

After seeding the database, you can access:

- **Demo Storefront**: http://localhost:3000/demo
- **Admin Dashboard**: http://localhost:3000/admin

Demo tenant credentials:
- Subdomain: `demo`
- Email: `admin@demo.printshop.com`

## 🧪 Development

### Run individual services

```bash
# API server
npm run api:dev

# Frontend
npm run web:dev

# Workers
npm run worker:dev
```

### Database commands

```bash
# Generate Prisma client
npm run db:generate

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
cd prisma && npx prisma studio
```

### Build for production

```bash
npm run build
```

## 📦 Key Packages

- `@nimble/core` - Shared types, enums, and validation schemas
- `@nimble/utils` - Logger and utility functions
- `@nimble/ui` - Shared React components
- `@nimble/web` - Next.js frontend application
- `@nimble/api` - NestJS backend API
- `@nimble/worker` - BullMQ worker service

## 🔐 Security

- Tenant isolation via row-level security
- Presigned S3 URLs (no public access)
- Stripe for PCI-compliant payment processing
- Clerk for authentication
- Audit logging for all actions

## 🛣️ Roadmap

### ✅ Phase 1 - MVP (Current)
- [x] Monorepo structure
- [x] Multi-tenant database schema
- [x] Product and pricing engine
- [x] Order workflow
- [x] File upload and storage
- [x] Basic admin dashboards
- [x] Worker queue system

### 🚧 Phase 2 - Internal Automation
- [ ] Event bus implementation
- [ ] Background job processing
- [ ] Public API endpoints
- [ ] Advanced preflight checks

### 📅 Phase 3 - External Integrations
- [ ] Shopify connector
- [ ] WooCommerce connector
- [ ] Etsy connector
- [ ] Webhook system

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is proprietary software.

## 🆘 Support

For issues and questions, please open an issue on GitHub.
