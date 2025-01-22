import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useOnboardingStore } from "./useOnboardingStore";
import { validateAndTransformOnboardingData } from "../../validators/onboarding";
import { useGoalStore } from "../../dashboard/store/useGoalStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      status: "not-authenticated",
      user: null,
      login: (user) => {
        set({ status: "authenticated", user });

        if (user.onboarding === null) return;
        const onboardingData = validateAndTransformOnboardingData(
          user.onboarding
        );

        useOnboardingStore.getState().updateFormData(onboardingData);
      },
      logout: () => {
        localStorage.clear();
        useOnboardingStore.getState().reset();
        useGoalStore.getState().reset();
        set({ status: "not-authenticated", user: null });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);
