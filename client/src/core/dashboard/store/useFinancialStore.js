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
      show: false,
      hasLoaded: false,
      setHasLoaded: (hasLoaded) => set({ hasLoaded }),
      toggleCurrencyType: () =>
        set((state) => ({
          currencyType: state.currencyType === "USD" ? "ARG" : "USD",
        })),

      toggleShow: () => set((state) => ({ show: !state.show })),

      updateFinancialData: (newFinancialData) =>
        set((state) => ({
          financial: {
            ...state.financial,
            ...newFinancialData,
          },
          hasLoaded: true,
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
          hasLoaded: false,
        })),
    }),
    {
      name: "financial-storage",
      getStorage: () => sessionStorage,
    }
  )
);
