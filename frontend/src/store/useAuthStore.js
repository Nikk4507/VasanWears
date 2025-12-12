import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  // Set authentication data
  setAuth: ({ user, accessToken, refreshToken }) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { user, accessToken, refreshToken };
    }),

  // Clear auth data
  logout: () =>
    set(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return { user: null, accessToken: null, refreshToken: null };
    }),

  // Check if logged in
  isAuthenticated: () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  },
}));
