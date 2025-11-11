# Architecture Overview

## System Architecture

Nimble is a multi-tenant SaaS platform built with a modern, scalable architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Storefront  │  │    Admin     │  │  SaaS Admin  │     │
│  │   (B2C/B2B)  │  │  Dashboard   │  │   Dashboard  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (NestJS)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Tenants  │ │ Products │ │  Orders  │ │ Billing  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Uploads  │ │  Users   │ │   Jobs   │ │  Webhooks│      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                  ┌─────────┴─────────┐
                  ▼                   ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Database (PostgreSQL)  │  │    Queue (BullMQ/Redis)  │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │ Multi-tenant data  │  │  │  │  Async job queue   │  │
│  │ Row-level security │  │  │  └────────────────────┘  │
│  └────────────────────┘  │  └──────────────────────────┘
└──────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────┐
                            │   Workers (BullMQ)       │
                            │  ┌────────────────────┐  │
                            │  │ Preflight Checker  │  │
                            │  │ Thumbnail Gen      │  │
                            │  │ Email Sender       │  │
                            │  └────────────────────┘  │
                            └──────────────────────────┘
                                           │
                                           ▼
                            ┌──────────────────────────┐
                            │   External Services      │
                            │  ┌────────────────────┐  │
                            │  │ AWS S3 (Storage)   │  │
                            │  │ Stripe (Payments)  │  │
                            │  │ Clerk (Auth)       │  │
                            │  └────────────────────┘  │
                            └──────────────────────────┘
```

## Technology Stack

### Frontend
- **Next.js 14**: App Router, Server Components, API Routes
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Clerk**: Authentication

### Backend
- **NestJS**: Node.js framework
- **Prisma**: ORM
- **PostgreSQL**: Primary database
- **TypeScript**: Type safety
- **Swagger**: API documentation

### Workers
- **BullMQ**: Job queue
- **Redis**: Queue backend
- **Sharp**: Image processing
- **Ghostscript**: PDF processing (future)

### Infrastructure
- **AWS S3**: File storage
- **Stripe**: Payment processing
- **Vercel**: Frontend hosting
- **Railway/AWS**: Backend hosting

## Multi-Tenancy Model

### Tenant Isolation

1. **Database Level**: All tenant-scoped tables include `tenantId` column
2. **API Level**: Every request includes `x-tenant-id` header
3. **Prisma Extension**: Automatic filtering by `tenantId`
4. **Subdomain Routing**: Each tenant has unique subdomain

### Tenant Theming

Tenants can customize:
- Logo
- Primary color
- Secondary color
- Font family
- Custom CSS

Applied dynamically at runtime on storefront.

## Data Model

### Core Entities

#### Tenant
- Represents a printing company
- Has subdomain, branding, and subscription
- One-to-many: Users, Products, Orders

#### User
- Can be: Super Admin, Tenant Admin, Tenant User, or Customer
- Authenticated via Clerk
- Belongs to a tenant (except Super Admin)

#### Product
- Belongs to a tenant
- Has pricing rules (base + quantity breaks + option markups)
- Configuration via JSON schema for options

#### Order
- Belongs to a tenant and customer
- Has multiple order items
- Flows through status: NEW → PREFLIGHT → PRESS → FINISH → SHIPPED

#### Job
- Linked to an order
- Tracks preflight results
- Stores job ticket and proof URLs

## Security

### Authentication
- Clerk handles user authentication
- JWT tokens for API access
- Role-based access control (RBAC)

### Data Security
- Tenant isolation via `tenantId`
- Row-level security in PostgreSQL
- Presigned S3 URLs (no public access)
- Audit logging for all actions

### Payment Security
- Stripe handles payment processing
- No credit card data stored
- PCI compliance via Stripe

## Async Processing

### Worker Jobs

1. **Preflight Check**
   - Validate DPI
   - Check bleed
   - Verify trim size
   - Validate color space

2. **Thumbnail Generation**
   - Convert PDFs to images
   - Resize images
   - Store in S3

3. **Email Notifications**
   - Order confirmation
   - Status updates
   - Production notifications

### Job Flow

```
Order Created → Queue Preflight Job → Worker Processes
                                    ↓
                              Update Job Status
                                    ↓
                              Queue Email Job
                                    ↓
                              Send Notification
```

## API Design

### RESTful Endpoints
- Resources: `/api/v1/tenants`, `/api/v1/products`, `/api/v1/orders`
- Standard HTTP methods: GET, POST, PATCH, DELETE
- Consistent error responses

### Pagination
- Query params: `page`, `perPage`
- Response includes: `data`, `meta`, `links`

### Filtering & Sorting
- Query params for filters
- Consistent naming conventions

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
- See `.env.example` for required variables
- Never commit `.env` files
- Use secret management in production

## Scalability Considerations

1. **Horizontal Scaling**
   - Stateless API servers
   - Multiple worker instances
   - Load balancer distribution

2. **Database Optimization**
   - Indexed queries on `tenantId`
   - Connection pooling
   - Query optimization

3. **Caching Strategy**
   - Redis for session storage
   - CDN for static assets
   - Database query caching

4. **File Storage**
   - S3 for unlimited storage
   - CloudFront CDN distribution
   - Presigned URLs for security

## Monitoring & Logging

- Structured logging via Winston
- Error tracking (Sentry recommended)
- Performance monitoring
- Database query monitoring
- Job queue monitoring

## Future Enhancements

### Phase 2
- Event bus for internal communication
- Public API for integrations
- Webhook system

### Phase 3
- Shopify connector
- WooCommerce connector
- Etsy connector
- Custom connector framework
