import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useOnboardingStore } from "./useOnboardingStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      status: "not-authenticated",
      user: null,
      login: (user) => set({ status: "authenticated", user }),
      logout: () => {
        localStorage.clear();
        useOnboardingStore.getState().reset();
        set({ status: "not-authenticated", user: null });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);
