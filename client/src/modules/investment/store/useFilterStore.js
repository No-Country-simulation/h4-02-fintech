import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFilterStore = create(
  persist(
    (set) => ({
      isModalOpen: false,
      selectedFilters: {
        instrument: "FOREX",
        riskLevel: "Conservador",
        term: "Corto plazo",
      },
      setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setFilter: (filterType, value) =>
        set((state) => ({
          selectedFilters: {
            ...state.selectedFilters,
            [filterType]: value,
          },
        })),
      resetFilters: () =>
        set({
          selectedFilters: {
            instrument: "Acciones",
            riskLevel: "Conservador",
            term: "Corto plazo",
          },
        }),
    }),
    {
      name: "filters-storage", 
      getStorage: () => sessionStorage,
    }
  )
);

export default useFilterStore;
