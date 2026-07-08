import { useMemo } from "react";
import type { SelectionsState } from "../types/selections";
import productsData from "../assets/data/products.json";
import type { Category } from "../types/category";

const categories = productsData.categories as Category[];

export function useBundleTotals(selections: SelectionsState) {
  return useMemo(() => {
    let subtotal = 0;
    let total = 0;

    categories.forEach((cat) => {
      cat.products.forEach((prod) => {
        const prodSelections = selections[prod.id] || {};
        prod.variants.forEach((variant) => {
          const qty = prodSelections[variant.id] || 0;
          if (qty > 0) {
            total += prod.price * qty;
            subtotal += (prod.compareAtPrice ?? prod.price) * qty;
          }
        });
      });
    });

    return {
      subtotal,
      total,
      savings: subtotal - total,
    };
  }, [selections]);
}
