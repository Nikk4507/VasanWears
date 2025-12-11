import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id && item.size === product.size);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.size === product.size
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        };
      }

      return { cart: [...state.cart, product] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      ),
    })),
}));
