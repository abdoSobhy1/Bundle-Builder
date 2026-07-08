export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function calculateDiscount(price: number, compareAtPrice: number | null): number {
  if (!compareAtPrice || compareAtPrice <= price) {
    return 0;
  }
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
