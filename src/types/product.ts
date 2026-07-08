export interface Variant {
  id: string;
  label: string;
  color?: string | null;
  image: string | undefined;
  previewImage: string | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  learnMoreLink?: string;
  badge: string | null;
  price: number;
  prediscountPrice: number | null;
  priceLabel?: string | null;
  comparePriceLabel?: string | null;
  variants: Variant[];
  planType?: boolean;
  isRequired?: boolean;
}
