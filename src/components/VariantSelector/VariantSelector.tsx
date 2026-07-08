import { type Variant } from "../../types/product";
import clsx from "clsx";
import styles from "./VariantSelector.module.css";

export interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className={styles.container}>
      {variants.map((variant) => {
        const isSelected = activeVariantId === variant.id;
        return (
          <button
            key={variant.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(variant.id);
            }}
            className={clsx(
              styles.button,
              isSelected && styles.buttonSelected,
            )}>
            <img
              src={variant.previewImage || undefined}
              alt={variant.label}
              className={styles.image}
            />
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
