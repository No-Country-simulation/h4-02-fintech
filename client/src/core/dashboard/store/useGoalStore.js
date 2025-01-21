import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoalStore = create(
  persist(
    (set) => ({
      goals: [
        {
          goalName: "Vacaciones 2025",
          category: "vacaciones",
          desiredAmount: 50000,
          deadline: new Date("2025-12-31"),
          progress: 50,
          contributions: [{ amount: 100, date: new Date("2025-01-01") }],
          suggestions: [
            "Incrementa tu ahorro mensual en un 10%",
            "Invierte en fondos de bajo riesgo para mayor seguridad",
            "Revisa las comisiones de tu cuenta de ahorro",
          ],
        },
      ],
      addGoal: (goal) =>
        set((state) => ({ goals: [...state.goals, { ...goal, progress: 0 }] })),
      addContribution: (amount) =>
        set((state) => {
          const updatedGoals = [...state.goals];
          updatedGoals[0].contributions.push({
            amount,
            date: new Date().toLocaleDateString(),
          });
          return { goals: updatedGoals };
        }),
      addSuggestion: (suggestion) =>
        set((state) => {
          const updatedGoals = [...state.goals];
          updatedGoals[0].suggestions.push(suggestion);
          return { goals: updatedGoals };
        }),
    }),
    {
      name: "goals-storage",
      getStorage: () => localStorage,
    }
  )
);
