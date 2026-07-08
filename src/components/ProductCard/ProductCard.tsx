import { useState } from "react";
import { type Product } from "../../types/product";
import { formatPrice } from "../../utils/price";
import { Badge } from "../Badge/Badge";
import { QuantityStepper } from "../QuantityStepper/QuantityStepper";
import { VariantSelector } from "../VariantSelector/VariantSelector";
import { useBundle } from "../../hooks/useBundle";
import clsx from "clsx";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { selections, updateQuantity } = useBundle();
  const [activeVariantId, setActiveVariantId] = useState<string>(
    product.variants[0].id,
  );

  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ||
    product.variants[0];

  const currentQuantity = selections[product.id]?.[activeVariantId] || 0;

  // Calculate total quantity across all variants of this product to determine if the card is "selected"
  const totalProductQuantity = Object.values(
    selections[product.id] || {},
  ).reduce((a, b) => a + b, 0);
  const isSelected = totalProductQuantity > 0 || product.isRequired;

  const hasSingleDefaultVariant =
    product.variants.length === 1 && product.variants[0].label === "Default";

  // Use variant image if available
  const displayImage = activeVariant.image || "";

  return (
    <div className={clsx(styles.card, isSelected && styles.cardSelected)}>
      <div className={styles.badgeContainer}>
        <Badge
          price={product.price}
          prediscountPrice={product.prediscountPrice}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={displayImage}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.infoContainer}>
          <h3 className={styles.title}>{product.title}</h3>

          <p className={styles.description}>
            {product.description}{" "}
            {product.learnMoreLink && (
              <a
                href={product.learnMoreLink}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer">
                Learn More
              </a>
            )}
          </p>

          {!hasSingleDefaultVariant && (
            <VariantSelector
              variants={product.variants}
              activeVariantId={activeVariantId}
              onSelect={(id) => setActiveVariantId(id)}
            />
          )}

          <div className={styles.bottomRow}>
            <QuantityStepper
              value={currentQuantity}
              onChange={(qty) =>
                updateQuantity(product.id, activeVariantId, qty)
              }
              min={product.isRequired ? 1 : 0}
              max={product.isRequired || product.planType ? 1 : undefined}
            />

            <div className={styles.priceContainer}>
              {product.prediscountPrice !== null && (
                <p className={styles.comparePrice}>
                  {product.comparePriceLabel ??
                    formatPrice(product.prediscountPrice)}
                </p>
              )}
              <p className={styles.price}>
                {product.priceLabel ??
                  (product.price === 0 ? "FREE" : formatPrice(product.price))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
