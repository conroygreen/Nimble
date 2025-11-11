# Nimble Printing SaaS Platform - Setup Guide

## Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 14+
- Redis 7+
- AWS Account (for S3)
- Stripe Account

## Installation

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Nimble
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Update the following in `.env`:
- `DATABASE_URL`: Your PostgreSQL connection string
- `REDIS_HOST` and `REDIS_PORT`: Your Redis instance
- AWS credentials for S3
- Stripe API keys
- Clerk authentication keys

### 3. Database Setup

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

Seed the database with demo data:

```bash
npm run db:seed
```

### 4. Start Development Servers

#### Option A: Start All Services

```bash
npm run dev
```

#### Option B: Start Services Individually

In separate terminal windows:

```bash
# Terminal 1 - API Server
npm run api:dev

# Terminal 2 - Frontend
npm run web:dev

# Terminal 3 - Worker
npm run worker:dev
```

## Access Points

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Demo Storefront**: http://localhost:3000/demo
- **Admin Dashboard**: http://localhost:3000/admin

## Default Demo Tenant

After seeding, you'll have a demo tenant:
- **Subdomain**: demo
- **Admin Email**: admin@demo.printshop.com
- **Products**: Business Cards, Flyers, Posters

## Architecture

```
/apps
  /web       - Next.js 14 frontend
  /api       - NestJS backend API
  /worker    - BullMQ async workers
/packages
  /core      - Shared types and schemas
  /utils     - Logging and utilities
  /ui        - Shared UI components
/prisma      - Database schema and migrations
```

## Development Workflow

1. Make changes to code
2. Tests run automatically (if configured)
3. API and frontend hot-reload automatically
4. Database changes require new migrations

## Testing

```bash
npm test
```

## Building for Production

```bash
npm run build
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Run `npm run db:generate` after schema changes

### Redis Connection Issues
- Ensure Redis is running
- Check REDIS_HOST and REDIS_PORT in .env

### Port Already in Use
- Change PORT in .env for API
- Frontend uses port 3000 by default

## Next Steps

1. Configure Clerk authentication
2. Set up Stripe products and prices
3. Configure AWS S3 bucket with CORS
4. Deploy to production (Vercel + Railway/AWS)

## Support

For issues and questions, please open an issue on GitHub.
