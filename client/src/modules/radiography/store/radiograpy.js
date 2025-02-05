import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRadiographyStore = create(
  persist(
    (set) => ({
      radiographyData: null,
      hasLoaded: false,
      setRadiographyData: (data) =>
        set({ radiographyData: data, hasLoaded: true }),
      reset: () => set({ radiographyData: null, hasLoaded: false }),
    }),
    {
      name: "radiography-storage",
      getStorage: () => sessionStorage,
    }
  )
);
