import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOperationsStore = create(
  persist(
    (set) => ({
      operations: [],
      setOperations: (data) => set({ operations: data }),
      clearOperations: () => set({ operations: [] }),
      reset: () => set({ operations: [] }),

      updateOperation: (coinId, quantity) =>
        set((state) => {
          const updatedOperations = state.operations
            .map((op) => {
              if (op.coin === coinId) {
                const updatedTotal = op.total + quantity;
                return { ...op, total: updatedTotal };
              }
              return op;
            })
            .filter((op) => op.total > 0);

          return { operations: updatedOperations };
        }),
    }),
    {
      name: "operations-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useOperationsStore;
