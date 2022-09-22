import { Cart } from "../actions"

const localstorageKey = "ecommerce";

export interface LocalestorageState {
  token?: string;
  cart?: Cart
}

export function getLocalstorageState() {
 
  try {
  const storeItem = localStorage.getItem(localstorageKey);
  if (!storeItem) {
    return null;
  }
  
    return JSON.parse(storeItem) as LocalestorageState;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export function setLocalstorageState(localestorageState: LocalestorageState) {
  const lastState = getLocalstorageState()
  
  const stateToStore = {
    ...lastState,
    ...localestorageState
  }
  localStorage.setItem(localstorageKey, JSON.stringify(stateToStore));
}

