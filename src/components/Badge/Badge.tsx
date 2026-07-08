import { calculateDiscount } from "../../utils/price";
import styles from "./Badge.module.css";

export interface BadgeProps {
  price: number;
  prediscountPrice: number | null;
}

export function Badge({ price, prediscountPrice }: BadgeProps) {
  const discount = calculateDiscount(price, prediscountPrice);

  if (discount <= 0) return null;

  return <div className={styles.badge}>Save {discount}%</div>;
}
