import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinancialStore = create(
  persist(
    (set) => ({
      financial: {
        income: {
          values: {
            USD: 0,
            ARG: 0,
          },
          percentage: 0,
        },
        savings: {
          values: {
            USD: 0,
            ARG: 0,
          },
          percentage: 0,
        },
        fixedExpenses: {
          values: {
            USD: 0,
            ARG: 0,
          },
          percentage: 0,
        },
        balance: {
          values: {
            USD: 0,
            ARG: 0,
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

      reset: () =>
        set(() => ({
          financial: {
            income: {
              values: {
                USD: 0,
                ARG: 0,
              },
              percentage: 0,
            },
            savings: {
              values: {
                USD: 0,
                ARG: 0,
              },
              percentage: 0,
            },
            fixedExpenses: {
              values: {
                USD: 0,
                ARG: 0,
              },
              percentage: 0,
            },
            balance: {
              values: {
                USD: 0,
                ARG: 0,
              },
            },
          },
        })),
    }),
    {
      name: "financial-storage",
      getStorage: () => sessionStorage,
    }
  )
);
