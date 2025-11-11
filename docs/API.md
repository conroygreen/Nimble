# API Documentation

Base URL: `http://localhost:3001/api/v1`

Interactive API docs available at: `http://localhost:3001/api/docs`

## Authentication

Most endpoints require authentication via Clerk. Include the bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Tenant Isolation

Multi-tenant endpoints require the `x-tenant-id` header:

```
x-tenant-id: <tenant-id>
```

## Endpoints

### Tenants

#### Create Tenant
```http
POST /api/v1/tenants
Content-Type: application/json

{
  "name": "Acme Print Shop",
  "subdomain": "acme",
  "primaryColor": "#3B82F6",
  "secondaryColor": "#1E40AF",
  "fontFamily": "Inter"
}
```

#### Get All Tenants
```http
GET /api/v1/tenants
```

#### Get Tenant by Subdomain
```http
GET /api/v1/tenants/by-subdomain?subdomain=demo
```

#### Get Tenant by ID
```http
GET /api/v1/tenants/:id
```

#### Update Tenant
```http
PATCH /api/v1/tenants/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "primaryColor": "#FF0000"
}
```

### Products

#### Create Product
```http
POST /api/v1/products
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "name": "Business Cards",
  "slug": "business-cards",
  "description": "Premium business cards",
  "basePrice": 49.99,
  "trimSize": "3.5x2",
  "requiredDpi": 300,
  "requiredBleed": 0.125,
  "quantityBreaks": [
    { "minQuantity": 100, "pricePerUnit": 0.49 },
    { "minQuantity": 500, "pricePerUnit": 0.29 }
  ],
  "options": [
    {
      "id": "finish",
      "name": "Finish",
      "type": "select",
      "required": true,
      "values": ["Matte", "Gloss"],
      "defaultValue": "Matte"
    }
  ],
  "optionMarkups": {
    "finish.Gloss": 5
  }
}
```

#### Get All Products
```http
GET /api/v1/products
x-tenant-id: <tenant-id>
```

#### Get Product by Slug
```http
GET /api/v1/products/by-slug/:slug
x-tenant-id: <tenant-id>
```

#### Calculate Price
```http
POST /api/v1/products/:id/calculate-price
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "quantity": 500,
  "options": {
    "finish": "Gloss",
    "corners": "Rounded"
  }
}
```

### Orders

#### Create Order
```http
POST /api/v1/orders
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "customerId": "user-id",
  "customerEmail": "customer@example.com",
  "shippingAddress": {
    "name": "John Doe",
    "line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US"
  },
  "totalAmount": 149.99,
  "paymentIntentId": "pi_xxx",
  "items": [
    {
      "productId": "product-id",
      "quantity": 500,
      "options": { "finish": "Gloss" },
      "fileUrls": ["https://s3.../file.pdf"],
      "price": 149.99
    }
  ]
}
```

#### Get All Orders
```http
GET /api/v1/orders
x-tenant-id: <tenant-id>
```

#### Get Order by ID
```http
GET /api/v1/orders/:id
x-tenant-id: <tenant-id>
```

#### Update Order Status
```http
PATCH /api/v1/orders/:id/status
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "status": "PRESS"
}
```

### Uploads

#### Generate Presigned Upload URL
```http
POST /api/v1/uploads/presigned-url
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "filename": "business-card.pdf",
  "contentType": "application/pdf"
}

Response:
{
  "uploadUrl": "https://s3.../...",
  "fileKey": "tenant-id/timestamp-filename",
  "publicUrl": "https://s3.../tenant-id/timestamp-filename"
}
```

#### Generate Multiple Presigned URLs
```http
POST /api/v1/uploads/presigned-urls
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "files": [
    { "filename": "front.pdf", "contentType": "application/pdf" },
    { "filename": "back.pdf", "contentType": "application/pdf" }
  ]
}
```

### Billing

#### Create Payment Intent
```http
POST /api/v1/billing/payment-intent
Content-Type: application/json

{
  "amount": 149.99,
  "currency": "usd"
}

Response:
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

#### Create Checkout Session
```http
POST /api/v1/billing/checkout-session
x-tenant-id: <tenant-id>
Content-Type: application/json

{
  "items": [
    { "name": "Business Cards", "amount": 149.99, "quantity": 1 }
  ],
  "successUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

## Order Status Flow

1. `NEW` - Order created, payment received
2. `PREFLIGHT` - Files being checked for print readiness
3. `PRESS` - Order being printed
4. `FINISH` - Post-press finishing (cutting, folding, etc.)
5. `SHIPPED` - Order shipped to customer
6. `CANCELLED` - Order cancelled

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid auth)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error
