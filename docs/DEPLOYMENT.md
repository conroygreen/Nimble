# Deployment Guide

This guide covers deploying the Nimble platform to production.

## Architecture

- **Frontend (Next.js)**: Vercel
- **Backend (NestJS)**: Railway or AWS
- **Database**: Managed PostgreSQL (Railway, AWS RDS, or Supabase)
- **Redis**: Managed Redis (Railway, AWS ElastiCache, or Upstash)
- **Storage**: AWS S3
- **Workers**: Same platform as backend (Railway or AWS)

## Prerequisites

- Domain name configured with DNS
- AWS account with S3 bucket created
- Stripe account with API keys
- Clerk account configured
- GitHub repository connected to deployment platforms

## Frontend Deployment (Vercel)

### 1. Connect Repository

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the `apps/web` directory as the root

### 2. Configure Build Settings

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Root Directory: apps/web
```

### 3. Environment Variables

Add these environment variables in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 4. Deploy

Click "Deploy" and Vercel will build and deploy your frontend.

### 5. Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS according to Vercel's instructions

## Backend Deployment (Railway)

### 1. Create New Project

1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select your repository

### 2. Configure Services

Create three services:

#### API Service

```
Root Directory: apps/api
Build Command: npm run build
Start Command: npm run start
```

Environment variables:
```
DATABASE_URL=<from railway postgres>
REDIS_HOST=<from railway redis>
REDIS_PORT=6379
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_S3_BUCKET=<your-bucket>
STRIPE_SECRET_KEY=sk_live_...
CLERK_SECRET_KEY=sk_live_...
PORT=3001
FRONTEND_URL=https://your-domain.com
```

#### Worker Service

```
Root Directory: apps/worker
Build Command: npm run build
Start Command: npm run start
```

Same environment variables as API service.

### 3. Add PostgreSQL Database

1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway will automatically set `DATABASE_URL` environment variable
3. Note the connection details

### 4. Add Redis

1. In Railway dashboard, click "New" → "Database" → "Redis"
2. Note the host and port for environment variables

### 5. Run Database Migrations

In Railway dashboard:
1. Open API service shell
2. Run: `npx prisma migrate deploy`
3. Run: `npx tsx prisma/seed.ts` (optional)

### 6. Configure Domain

1. Go to API service settings
2. Click "Generate Domain" or add custom domain
3. Update `NEXT_PUBLIC_API_URL` in Vercel

## Alternative: AWS Deployment

### Frontend (AWS Amplify)

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Backend (AWS ECS/Fargate)

1. Create ECR repository for API and Worker
2. Build and push Docker images
3. Create ECS cluster
4. Define task definitions
5. Create services
6. Configure Application Load Balancer

### Database (AWS RDS)

1. Create PostgreSQL instance in RDS
2. Configure VPC and security groups
3. Update `DATABASE_URL` in ECS task definitions

### Redis (AWS ElastiCache)

1. Create Redis cluster in ElastiCache
2. Configure VPC and security groups
3. Update Redis connection in ECS task definitions

## AWS S3 Configuration

### 1. Create S3 Bucket

```bash
aws s3 mb s3://nimble-uploads-production
```

### 2. Configure CORS

Create `cors.json`:

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://your-domain.com"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"]
    }
  ]
}
```

Apply CORS:

```bash
aws s3api put-bucket-cors --bucket nimble-uploads-production --cors-configuration file://cors.json
```

### 3. IAM Policy

Create IAM user with this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::nimble-uploads-production/*"
    }
  ]
}
```

## Stripe Configuration

### 1. Webhook Endpoint

Add webhook endpoint in Stripe dashboard:

```
URL: https://your-api.railway.app/api/v1/webhooks/stripe
Events: payment_intent.succeeded, charge.failed, subscription.updated
```

### 2. Get Webhook Secret

Copy the webhook signing secret and add to environment:

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Clerk Configuration

### 1. Add Production Instance

1. Create production instance in Clerk
2. Configure allowed origins:
   - `https://your-domain.com`
   - `https://your-api.railway.app`

### 2. Update Environment

Replace test keys with production keys in both Vercel and Railway.

## Post-Deployment Checklist

- [ ] Verify frontend loads at custom domain
- [ ] Test API endpoints via `/api/docs`
- [ ] Create test tenant and verify isolation
- [ ] Upload test file to S3
- [ ] Process test order end-to-end
- [ ] Verify worker jobs are processing
- [ ] Test Stripe payment flow
- [ ] Check logs for errors
- [ ] Set up monitoring (Sentry)
- [ ] Configure backup strategy for database
- [ ] Set up SSL certificates (automatic with Vercel/Railway)
- [ ] Configure CDN for S3 (CloudFront)

## Monitoring

### Error Tracking (Sentry)

1. Create Sentry project
2. Add Sentry SDK to apps
3. Configure DSN in environment variables

### Logging

- Use Winston for structured logging
- Stream logs to service like Logtail or Datadog
- Set up alerts for errors

### Performance

- Enable Vercel Analytics
- Monitor API response times
- Track worker job processing times
- Monitor database query performance

## Scaling Considerations

### Horizontal Scaling

- API: Increase Railway replicas
- Workers: Add more worker instances
- Database: Use read replicas for queries

### Caching

- Add Redis caching for frequent queries
- Use CDN for static assets
- Implement API response caching

### Database

- Add indexes for frequently queried fields
- Implement connection pooling
- Consider partitioning large tables

## Backup Strategy

### Database Backups

Railway: Automatic backups included in plan
AWS RDS: Configure automated backups

### S3 Backups

Enable versioning on S3 bucket:

```bash
aws s3api put-bucket-versioning \
  --bucket nimble-uploads-production \
  --versioning-configuration Status=Enabled
```

## Rollback Procedure

### Frontend (Vercel)

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Backend (Railway)

1. Go to Deployments
2. Revert to previous deployment
3. Or roll back via Git commit

## Support

For deployment issues, check:
- Platform status pages
- Application logs
- Error monitoring (Sentry)
- Database connection status
