import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"
import type { CartItem } from "@/types/cart.types"

type CartState = {
  cartItems: CartItem[];
};

type CartActions = {
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (productId: CartItem["id"]) => void;
  decreaseQuantity: (productId: CartItem["id"]) => void;
  removeItem: (productId: CartItem["id"]) => void;
  clearCart: () => void;
  cartItemCounter: () => number;
  calculatePrice: (price: number, discount: number) => number;
};

export const useCartStore = create<CartState & CartActions>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],

        calculatePrice: (price, discount) =>
          discount > 0 ? price * (1 - discount / 100) : price,

        addToCart: (product) =>
          set((state) => {
            const exists = state.cartItems.find((i) => i.id === product.id);
            if (exists) {
              return {
                cartItems: state.cartItems.map((i) =>
                  i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return {
              cartItems: [...state.cartItems, { ...product, quantity: 1 }],
            };
          }),

        increaseQuantity: (productId) =>
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })),

        decreaseQuantity: (productId) =>
          set((state) => ({
            cartItems: state.cartItems
              .map((i) => {
                if (i.id !== productId) return i;
                return i.quantity > 1
                  ? { ...i, quantity: i.quantity - 1 }
                  : null;
              })
              .filter(Boolean) as CartItem[],
          })),

        removeItem: (productId) =>
          set((state) => ({
            cartItems: state.cartItems.filter((i) => i.id !== productId),
          })),

        clearCart: () => set({ cartItems: [] }),

        cartItemCounter: () => get().cartItems.length,
      }),
      {
        name: "cart-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
