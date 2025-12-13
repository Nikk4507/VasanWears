import { create } from "zustand";
import { currentUserApi } from "../utils/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthChecked: false, // 👈 NEW

  setUser: (user) =>
    set({ user }),

  setAuthChecked: () =>
    set({ isAuthChecked: true }),
  fetchCurrentUser: async () => {
    try {
      const res = await currentUserApi();
      console.log("res", res.data);
      
      set({ user: res.data });
    } catch {
      set({ user: null });
    }
  },
  logout: () =>
    set({
      user: null,
      isAuthChecked: true,
    }),
}));
