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
      updateFormData: (newData) =>
        set((state) => ({
          formData: { ...state.formData, ...newData },
        })),
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
