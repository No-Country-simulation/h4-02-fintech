import { useEffect } from "react";
import { Notification, Sms } from "iconsax-react";
import { useCallback, useState } from "react";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useNotificationStore } from "../store/useNotificatiosStore";
import { getErrorMessage } from "../../validators/errorHandler";
import { toast } from "sonner";
import {
  getNotifications,
  postMarkAllAsRead,
  postMarkAsRead,
} from "../services/notification";
import { useAuthStore } from "../../auth/store/useAuthStore";

export default function NotificationsModal() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [page, setPage] = useState(0);

  const {
    notifications,
    markAllAsRead,
    markAsRead,
    appendNotifications,
    setNotifications,
  } = useNotificationStore();

/*   const onHandleNewNotification = useCallback(async () => {
    try {
      if (!user) return;
      const resp = await getNotifications(user.id, 0, 2);
      if (!resp || resp.length === 0) return;

      const now = new Date();
      const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      const newNotifications = resp.filter(
        (notification) =>
          new Date(notification.createdAt) > twoMinutesAgo &&
          !notification.isRead
      );

      if (newNotifications.length > 0) {
        newNotifications.forEach((notification) => {
          toast(`Nueva notificación: ${notification.message}`, {
            expand: true,
          });
        });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al cargar más notificaciones", {
        description: errorMessage,
      });
      console.error("Error al cargar más notificaciones", error);
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.notifyMilestoneAchieved && user.notifySavingsGoalMet) {
        onHandleNewNotification();
      }
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [
    onHandleNewNotification,
    user.notifyMilestoneAchieved,
    user.notifySavingsGoalMet,
  ]);
 */
  
  const onHandleNotifications = useCallback(async () => {
    try {
      if (!sessionStorage.getItem("token")) return;
      if (!user) return;
      const resp = await getNotifications(user.id, 0, 2);
      if (Array.isArray(resp)) {
        setNotifications(resp);
        if (resp.length <= 0) {
          setIsFull(true);
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al cargar más notificaciones", {
        description: errorMessage,
      });
      console.error("Error al cargar más notificaciones", error);
    }
  }, [user, setNotifications]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    onHandleNotifications();
  }, [onHandleNotifications]);

  const onHandleLoadMore = useCallback(
    async (page) => {
      try {
        if (!user) return;
        const resp = await getNotifications(user.id, page, 2);
        if (Array.isArray(resp)) {
          appendNotifications(resp);
          if (resp.length <= 0) {
            setIsFull(true);
          }
        } else {
          console.error(
            "Las notificaciones adicionales no son un arreglo válido"
          );
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error("Problemas al cargar más notificaciones", {
          description: errorMessage,
        });
        console.error("Error al cargar más notificaciones", error);
      }
    },
    [user, appendNotifications]
  );

  useEffect(() => {
    if (page === 0) return;
    onHandleLoadMore(page);
  }, [page, onHandleLoadMore]);

  const onMarkAllAsRead = async () => {
    try {
      const notificationsToMarkAsRead = notifications.filter(
        (notification) => !notification.isRead
      );
      if (notificationsToMarkAsRead.length <= 0) return;
      const notificationIds = notificationsToMarkAsRead.map(
        (notification) => notification.id
      );
      await postMarkAllAsRead(user.id, notificationIds);
      markAllAsRead();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al marcar como leídas", {
        description: errorMessage,
      });
      console.error("Error al marcar como leídas", error);
    }
  };

  const onMarkAsRead = async (notificationId, isRead) => {
    if (isRead) return;
    try {
      await postMarkAsRead(user.id, notificationId);
      markAsRead(notificationId);
      toast("Notificación leída", {
        description: "Notificación marcada como leída",
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al marcar como leída", {
        description: errorMessage,
      });
      console.error("Error al marcar como leída", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={() => setIsOpen(true)}
      >
        <Notification size="24" />
        {Array.isArray(notifications) &&
          notifications.some((notification) => !notification.isRead) && (
            <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-secondary"></span>
          )}
      </button>

      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-box relative bg-base max-w-md p-6 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-ghost absolute right-2 top-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-2 text-black">
              Notificaciones
            </h2>
            <p className="text-gray-500">
              Tienes{" "}
              {Array.isArray(notifications)
                ? notifications.filter((n) => !n.isRead).length
                : 0}{" "}
              mensajes sin leer
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {Array.isArray(notifications) && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex text-black gap-3 items-start p-3 rounded-lg cursor-pointer transition ${
                    !notification.isRead
                      ? "hover:bg-slate-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    onMarkAsRead(notification.id, notification.isRead)
                  }
                >
                  {!notification.isRead ? (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-transparent mt-2"></div>
                  )}

                  <div>
                    <p className="mb-1">{notification.message}</p>
                    <p className="text-gray-500 text-sm">
                      {formatTimeAgo(new Date(notification.createdAt))}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay notificaciones para mostrar.</p>
            )}
          </div>

          {!isFull ? (
            <button
              className="btn btn-ghost btn-link w-full flex gap-2 items-center justify-center mb-4"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Cargar más
            </button>
          ) : (
            <p className="text-center text-gray-500">
              No tienes más notificaciones
            </p>
          )}

          <button
            className="btn btn-primary w-full flex gap-2 items-center justify-center"
            onClick={onMarkAllAsRead}
          >
            <Sms size="24" /> Marcar todas como leídas
          </button>
        </div>
      </dialog>
    </div>
  );
}
