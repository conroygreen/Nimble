Hybrid B2B + B2C Printing SaaS Platform (MVP)

This repository contains a multi-tenant, white-label printing SaaS MVP. It’s a monorepo with:

- apps/web: Next.js 14 + TypeScript + Tailwind storefront and admin
- apps/api: NestJS + Prisma + PostgreSQL backend APIs
- apps/worker: BullMQ workers for preflight and notifications
- packages/ui: shared UI components
- packages/core: shared types and DTOs
- packages/utils: shared config and logger
- prisma: Prisma schema and seed
- docs: setup, ERD, and OpenAPI spec

Quick start is in docs/SETUP.md once all packages are installed.

Phases
- Phase 1: MVP core (this repo)
- Phase 2: Internal automation (event bus, background tasks)
- Phase 3: External connectors (Shopify, Woo, Etsy) – stubs only for now

License
MIT
