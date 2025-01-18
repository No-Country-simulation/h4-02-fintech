import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinancialStore = create(
  persist(
    (set) => ({
      financial: {
        income: {
          values: {
            USD: 7000,
            ARG: 10000000,
          },
          percentage: 50,
        },
        savings: {
          values: {
            USD: 1400,
            ARG: 2500000,
          },
          percentage: 30,
        },
        fixedExpenses: {
          values: {
            USD: 2000,
            ARG: 2500000,
          },
          percentage: 20,
        },
        balance: {
          values: {
            USD: 62500,
            ARG: 10000000,
          },
        },
      },

      currencyType: "ARG",

      toggleCurrencyType: () =>
        set((state) => ({
          currencyType: state.currencyType === "USD" ? "ARG" : "USD",
        })),

      updateFinancialData: (newFinancialData) =>
        set((state) => ({
          financial: {
            ...state.financial,
            ...newFinancialData,
          },
        })),
    }),
    {
      name: "financial-storage",
      getStorage: () => localStorage,
    }
  )
);
