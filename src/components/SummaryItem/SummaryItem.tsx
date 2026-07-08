import { QuantityStepper } from "../QuantityStepper/QuantityStepper";
import { formatPrice } from "../../utils/price";
import styles from "./SummaryItem.module.css";
import type { Product, Variant } from "../../types/product";

interface SummaryItemProps {
  product: Product;
  variant: Variant;
  qty?: number;
  updateQuantity?: (productId: string, variantId: string, qty: number) => void;
  itemVariant?: "default" | "plan";
}

export function SummaryItem({
  product,
  variant,
  qty,
  updateQuantity,
  itemVariant = "default",
}: SummaryItemProps) {
  const isPlan = itemVariant === "plan";

  return (
    <div className={`${styles.lineItem} ${isPlan ? styles.plan : ""}`}>
      <div className={styles.imageBox}>
        <img
          src={variant.image || ""}
          alt={variant.label}
          className={styles.image}
        />
      </div>

      <h4 className={styles.itemTitle}>
        {isPlan ? (
          <>
            Cam <span style={{ color: "var(--color-accent)" }}>Unlimited</span>
          </>
        ) : (
          product.title
        )}
      </h4>

      {!isPlan && updateQuantity && qty !== undefined && (
        <QuantityStepper
          variant="mini"
          value={qty}
          onChange={(newQty) => updateQuantity(product.id, variant.id, newQty)}
          min={product.isRequired ? 1 : 0}
          max={product.isRequired || product.planType ? 1 : undefined}
        />
      )}

      <div className={styles.itemPriceBox}>
        {product.prediscountPrice !== null && (
          <div className={styles.itemComparePrice}>
            {formatPrice(product.prediscountPrice)}
            {isPlan && "/mo"}
          </div>
        )}
        <div className={styles.itemPrice}>
          {product.price === 0 ? "FREE" : formatPrice(product.price)}
          {isPlan && "/mo"}
        </div>
      </div>
    </div>
  );
}
