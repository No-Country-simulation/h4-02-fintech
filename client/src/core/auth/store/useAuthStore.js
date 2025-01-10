import { create } from "zustand";

export const useAuthStore = create((set) => ({
  status: "not-authenticated",
  user: null,
  login: (user) => set({ status: "authenticated", user }),
  logout: () => set({ status: "not-authenticated", user: null }),
}));
