import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoalStore = create(
  persist(
    (set) => ({
      goals: [],
      setGoals: (goals) => set({ goals }),
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { ...goal, progress: 0, message: "¡Vas por buen camino!" },
          ],
        })),
      addContribution: (updatedGoal) =>
        set((state) => {
          const updatedGoals = state.goals.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
          );
          return { goals: updatedGoals };
        }),
      reset: () =>
        set(() => ({
          goals: [],
        })),
    }),
    {
      name: "goals-storage",
      getStorage: () => localStorage,
    }
  )
);
