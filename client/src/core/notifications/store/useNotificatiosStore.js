import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      setNotifications: (notifications) => set({ notifications }),

      appendNotifications: (newNotifications) =>
        set((state) => ({
          notifications: [...state.notifications, ...newNotifications],
        })),

      markAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
        })),

      reset: () => set({ notifications: [] }),
    }),
    {
      name: "notifications-storage",
      getStorage: () => sessionStorage,
    }
  )
);
