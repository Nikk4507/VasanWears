import { create } from "zustand";
import { getCartApi } from "../utils/cartApi";

export const useCartStore = create((set) => ({
  items: [],
  subtotal: 0,
  totalQty: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await getCartApi();
      const cart = res.data;

      const totalQty = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      set({
        items: cart.items,
        subtotal: cart.subtotal,
        totalQty,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  clearLocalCart: () =>
    set({
      items: [],
      subtotal: 0,
      totalQty: 0,
    }),
}));
