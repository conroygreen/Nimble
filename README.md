# Nimble

A Hybrid B2B + B2C Printing SaaS Platform

## Overview

Nimble is a white-label printing SaaS platform designed to serve both B2C customers and B2B clients. Built with a modern tech stack including Next.js, NestJS, and Prisma.

## Project Structure

This is a monorepo using pnpm workspaces:

```
apps/
  ├── api/          # NestJS backend API
  ├── web/          # Next.js frontend application
  └── worker/       # Background worker service
packages/
  ├── core/         # Shared core functionality
  ├── ui/           # Shared UI components
  └── utils/        # Shared utility functions
```

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: NestJS, Express
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Queue**: Redis
- **Storage**: AWS S3
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9.0.0
- PostgreSQL
- Redis (optional, for development)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Generate Prisma client:
```bash
pnpm --filter @nimble/api exec prisma generate
```

4. Run database migrations (when PostgreSQL is available):
```bash
pnpm --filter @nimble/api exec prisma migrate dev
```

### Development

Run all applications in development mode:
```bash
pnpm dev
```

Or run individual applications:
```bash
pnpm dev:web    # Web app on http://localhost:3000
pnpm dev:api    # API on http://localhost:4000
pnpm dev:worker # Worker on http://localhost:4001
```

### API Endpoints

- `GET /` - API information and available endpoints
- `GET /v1/health` - Health check endpoint

## Building

Build all applications:
```bash
pnpm build
```

## License

Private
