import type { Category } from "../types/category";
import type { SelectionsState } from "../types/selections";

export function enforceBundleRules(
  selections: SelectionsState,
  categories: Category[],
): SelectionsState {
  if (!categories || categories.length === 0) return selections;

  const nextSelections = { ...selections };

  // Rule 1: Auto select/deselect the hub based on cameras
  const camerasCategory = categories.find((c) => c.id === "cameras");
  if (camerasCategory) {
    let totalCameras = 0;
    camerasCategory.products.forEach((prod) => {
      const prodSel = nextSelections[prod.id] || {};
      Object.values(prodSel).forEach((q) => {
        totalCameras += q;
      });
    });

    const hubId = "wyze-sense-hub";
    const hubVariantId = "wyze-sense-hub-default";

    const hubSelections = { ...(nextSelections[hubId] || {}) };
    if (totalCameras > 0) {
      hubSelections[hubVariantId] = 1;
    } else {
      hubSelections[hubVariantId] = 0;
    }
    nextSelections[hubId] = hubSelections;
  }

  return nextSelections;
}
