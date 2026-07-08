export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function calculateDiscount(
  price: number,
  prediscountPrice: number | null,
): number {
  if (!prediscountPrice || prediscountPrice <= price) {
    return 0;
  }
  return Math.round(((prediscountPrice - price) / prediscountPrice) * 100);
}
