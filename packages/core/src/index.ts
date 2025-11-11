export type Theme = {
  logoUrl?: string | null;
  colors?: { primary?: string; background?: string };
  fonts?: { heading?: string; body?: string };
};

export type PricingBreak = {
  minQty: number;
  unitPrice: number;
};

export function calculatePrice(basePrice: number, qty: number, breaks: PricingBreak[] = []) {
  const sorted = [...breaks].sort((a, b) => b.minQty - a.minQty);
  const match = sorted.find((b) => qty >= b.minQty);
  const unit = match ? match.unitPrice : basePrice;
  const total = unit * qty;
  return { unit, total };
}
