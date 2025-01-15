import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOnboardingStore = create(
  persist(
    (set) => ({
      formData: {
        knowledgeLevel: "",
        goals: [],
        riskPreference: "",
        monthlyIncome: "",
        monthlyExpenses: "",
        savingsPercentage: "",
      },
      step: 1,
      isFirstSet: true,
      setFistSate: (value) => set({ isFirstSet: value }),
      updateFormData: (newData) =>
        set((state) => {
          const isFirstSet = state.isFirstSet;
          if (isFirstSet) {
            return {
              formData: { ...state.formData, ...newData },
              isFirstSet: false,
            };
          } else {
            return {
              formData: { ...state.formData, ...newData },
            };
          }
        }),
      setStep: (step) => set({ step }),
      nextStep: () =>
        set((state) => ({
          step: state.step + 1,
        })),
      prevStep: () =>
        set((state) => ({
          step: state.step - 1,
        })),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
