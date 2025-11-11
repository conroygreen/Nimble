import { z } from 'zod';

// Validation schemas using Zod

export const TenantThemeSchema = z.object({
  logo: z.string().url().optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  fontFamily: z.string().min(1),
  customCss: z.string().optional(),
});

export const ProductOptionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['select', 'text', 'number', 'color']),
  required: z.boolean(),
  values: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
});

export const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  options: z.record(z.string()),
  fileUrls: z.array(z.string().url()),
  price: z.number().positive(),
});

export const CreateOrderSchema = z.object({
  tenantId: z.string(),
  customerId: z.string(),
  items: z.array(OrderItemSchema),
  shippingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentIntentId: z.string(),
});
