import type { SelectionsState } from "../types/selections";

const LOCAL_STORAGE_KEY = "bundle_builder_save";

export function saveStateToStorage(state: SelectionsState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

export function loadStateFromStorage(
  defaultState: SelectionsState,
): SelectionsState {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load state from localStorage due to", e);
  }
  return defaultState;
}
