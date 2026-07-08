import { useMemo } from "react";
import type { SelectionsState } from "../types/selections";
import type { Category } from "../types/category";

export function useBundleTotals(
  selections: SelectionsState,
  categories: Category[] | null,
) {
  return useMemo(() => {
    let subtotal = 0;
    let total = 0;

    if (categories) {
      categories.forEach((cat) => {
        cat.products.forEach((prod) => {
        const prodSelections = selections[prod.id] || {};
        prod.variants.forEach((variant) => {
          const qty = prodSelections[variant.id] || 0;
          if (qty > 0) {
            total += prod.price * qty;
            subtotal += (prod.prediscountPrice ?? prod.price) * qty;
          }
        });
        });
      });
    }

    return {
      subtotal,
      total,
      savings: subtotal - total,
    };
  }, [selections, categories]);
}
