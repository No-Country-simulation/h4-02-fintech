import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [
        {
          id: 1,
          message: "Tu inversión en AL30 ha tenido un rendimiento de 0.2%",
          time: new Date(new Date().getTime() - 60 * 60 * 1000), // 1 hora atrás
          isRead: false,
        },
        {
          id: 2,
          message: "¡Estás a solo $5,000 de tus próximas vacaciones!",
          time: new Date(new Date().getTime() - 30 * 60 * 1000), // 30 minutos atrás
          isRead: false,
        },
        {
          id: 3,
          message: "Se ha realizado un nuevo aporte a tu cuenta de ahorro.",
          time: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 horas atrás
          isRead: true,
        },
      ],

      setNotifications: (notifications) => set({ notifications }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
        })),
    }),
    {
      name: "notifications-storage",
      getStorage: () => localStorage,
    }
  )
);
