import { create } from "zustand";
import {
  getCartApi,
  updateCartItemApi,
  removeFromCartApi,
} from "../utils/cartApi";

export const useCartStore = create((set, get) => ({
  items: [],
  subtotal: 0,
  totalQty: 0,
  loading: false,

  /* ================= FETCH CART ================= */
  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await getCartApi();
      const cart = res.data || { items: [], subtotal: 0 };
      console.log("Cart 1",cart);
      
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

  /* ================= UPDATE QTY ================= */
  updateQty: async (itemId, quantity) => {
    if (quantity < 1) return;

    // 🔥 Optimistic UI
    set((state) => ({
      items: state.items.map((i) =>
        i._id === itemId ? { ...i, quantity } : i
      ),
      subtotal: state.items.reduce(
        (sum, i) =>
          sum +
          (i._id === itemId ? quantity : i.quantity) * i.price,
        0
      ),
    }));

    try {
      await updateCartItemApi(itemId, quantity);
      await get().fetchCart(); // sync
    } catch {
      await get().fetchCart(); // rollback
    }
  },

  /* ================= REMOVE ITEM ================= */
  removeItem: async (itemId) => {
    // Optimistic remove
    set((state) => ({
      items: state.items.filter((i) => i._id !== itemId),
      subtotal: state.items
        .filter((i) => i._id !== itemId)
        .reduce((sum, i) => sum + i.price * i.quantity, 0),
    }));

    try {
      await removeFromCartApi(itemId);
      await get().fetchCart();
    } catch {
      await get().fetchCart();
    }
  },

  clearLocalCart: () =>
    set({
      items: [],
      subtotal: 0,
      totalQty: 0,
    }),
}));
