import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoalStore = create(
  persist(
    (set) => ({
      goals: [],
      hasLoaded: false,

      setGoals: (goals) => set({ goals, hasLoaded: true }),

      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { ...goal, progress: 0, message: "¡Vas por buen camino!" },
          ],
        })),

      updateGoal: async (goalId, updatedGoal) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId ? { ...goal, ...updatedGoal } : goal
          ),
        }));
      },

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
          hasLoaded: false,
        })),
    }),
    {
      name: "goals-storage",
      getStorage: () => sessionStorage,
    }
  )
);
