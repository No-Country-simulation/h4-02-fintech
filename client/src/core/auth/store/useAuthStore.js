import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useOnboardingStore } from "./useOnboardingStore";
import { validateAndTransformOnboardingData } from "../../validators/onboarding";
import { useGoalStore } from "../../dashboard/store/useGoalStore";
import { useNotificationStore } from "../../notifications/store/useNotificatiosStore";
import useOperationsStore from "../../../modules/investment/store/useOperation";
import { useFinancialStore } from "../../dashboard/store/useFinancialStore";
import { useRadiographyStore } from "../../../modules/radiography/store/radiograpy";

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
        sessionStorage.clear();
        useOnboardingStore.getState().reset();
        useGoalStore.getState().reset();
        useNotificationStore.getState().reset();
        useOperationsStore.getState().reset();
        useFinancialStore.getState().reset();
        useRadiographyStore.getState().reset();
        set({ status: "not-authenticated", user: null });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => sessionStorage,
    }
  )
);
