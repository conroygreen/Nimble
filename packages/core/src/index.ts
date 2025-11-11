// Shared types and DTO placeholders
export type TenantId = string;

export interface PriceBreak {
  minQty: number;
  maxQty?: number;
  unitPrice: number;
}

export interface ProductOptionSchema {
  name: string;
  type: "select" | "radio" | "checkbox" | "number" | "text";
  key: string;
  required?: boolean;
  values?: Array<{ label: string; value: string; markup?: number }>;
}

export interface PricingRule {
  basePrice: number;
  optionMarkups?: Record<string, number>;
  breaks?: PriceBreak[];
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
