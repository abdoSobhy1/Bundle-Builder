import { createContext, useState, type ReactNode } from "react";

import type { SelectionsState } from "../types/selections";
import { useBundleTotals } from "../hooks/useBundleTotals";
import { loadStateFromStorage, saveStateToStorage } from "../utils/storage";
import { enforceBundleRules } from "../utils/bundleRules";

export interface BundleContextType {
  selections: SelectionsState;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  saveToStorage: () => void;
  savedMessageVisible: boolean;
  totals: {
    subtotal: number;
    total: number;
    savings: number;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const BundleContext = createContext<BundleContextType | undefined>(
  undefined,
);



// The exact state shown in the design
const defaultState: SelectionsState = {
  "wyze-cam-v4": { "wyze-cam-v4-white": 1 },
  "wyze-cam-pan-v3": { "wyze-cam-pan-v3-white": 2 },
  "wyze-sense-motion-sensor": { "wyze-sense-motion-sensor-default": 2 },
  "wyze-sense-hub": { "wyze-sense-hub-default": 1 },
  "wyze-microsd-256": { "wyze-microsd-256-default": 2 },
  "cam-unlimited": { "cam-unlimited-monthly": 1 },
};

export function BundleProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<SelectionsState>(() =>
    loadStateFromStorage(defaultState),
  );
  const [savedMessageVisible, setSavedMessageVisible] = useState(false);

  const saveToStorage = () => {
    saveStateToStorage(selections);
    setSavedMessageVisible(true);
    setTimeout(() => setSavedMessageVisible(false), 3000);
  };

  const totals = useBundleTotals(selections);

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number,
  ) => {
    setSelections((prev) => {
      const productSelections = { ...(prev[productId] || {}) };
      productSelections[variantId] = Math.max(0, quantity);

      let nextSelections = {
        ...prev,
        [productId]: productSelections,
      };

      nextSelections = enforceBundleRules(nextSelections);

      return nextSelections;
    });
  };

  return (
    <BundleContext.Provider
      value={{
        selections,
        updateQuantity,
        saveToStorage,
        savedMessageVisible,
        totals,
      }}>
      {children}
    </BundleContext.Provider>
  );
}
