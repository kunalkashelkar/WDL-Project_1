import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartStoreItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartStoreItem[];
  addItem: (item: Omit<CartStoreItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === item.id);
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + 1,
            };
            return { items: updatedItems };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cartflow-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);

// Atomic Selectors to avoid unnecessary re-renders
export const selectCartItems = (state: CartState) => state.items;
export const selectTotalItemCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);
export const selectSubtotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectAddItem = (state: CartState) => state.addItem;
export const selectRemoveItem = (state: CartState) => state.removeItem;
export const selectIncrementQuantity = (state: CartState) => state.incrementQuantity;
export const selectDecrementQuantity = (state: CartState) => state.decrementQuantity;
export const selectClearCart = (state: CartState) => state.clearCart;
