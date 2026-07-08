import { calculateDiscount } from "../../utils/price";
import styles from "./Badge.module.css";

export interface BadgeProps {
  price: number;
  compareAtPrice: number | null;
}

export function Badge({ price, compareAtPrice }: BadgeProps) {
  const discount = calculateDiscount(price, compareAtPrice);

  if (discount <= 0) return null;

  return <div className={styles.badge}>Save {discount}%</div>;
}
