import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      status: "not-authenticated",
      user: null,
      login: (user) => set({ status: "authenticated", user }),
      logout: () => set({ status: "not-authenticated", user: null }),
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);
