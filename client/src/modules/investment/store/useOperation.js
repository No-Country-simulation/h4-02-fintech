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
          const existingOperation = state.operations.find(
            (op) => op.coin === coinId
          );

          if (existingOperation) {
            const updatedTotal = existingOperation.total + quantity;

            const updatedOperations = state.operations.map((op) =>
              op.coin === coinId ? { ...op, total: updatedTotal } : op
            );

            return {
              operations: updatedOperations.filter((op) => op.total > 0),
            };
          }

          // Si no existe la operación, agregarla
          return {
            operations: [
              ...state.operations,
              { coin: coinId, total: quantity },
            ],
          };
        }),
    }),
    {
      name: "operations-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useOperationsStore;
