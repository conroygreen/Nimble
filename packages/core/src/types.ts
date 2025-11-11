// Shared types and DTOs for the Nimble platform

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  TENANT_USER = 'TENANT_USER',
  CUSTOMER = 'CUSTOMER',
}

export enum SubscriptionTier {
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum OrderStatus {
  NEW = 'NEW',
  PREFLIGHT = 'PREFLIGHT',
  PRESS = 'PRESS',
  FINISH = 'FINISH',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export enum PreflightStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export interface TenantTheme {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCss?: string;
}

export interface PricingRule {
  basePrice: number;
  quantityBreaks: Array<{
    minQuantity: number;
    pricePerUnit: number;
  }>;
  optionMarkups: Record<string, number>;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'select' | 'text' | 'number' | 'color';
  required: boolean;
  values?: string[];
  defaultValue?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  options: Record<string, string>;
  fileUrls: string[];
  price: number;
}

export interface PreflightCheck {
  dpi: { passed: boolean; actual?: number; required: number };
  bleed: { passed: boolean; actual?: number; required: number };
  trimSize: { passed: boolean; actual?: string; required: string };
  colorSpace: { passed: boolean; actual?: string; required: string };
}
