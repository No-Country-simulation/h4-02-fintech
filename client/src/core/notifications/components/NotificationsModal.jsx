import { Notification, Sms } from "iconsax-react";
import { useState } from "react";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useNotificationStore } from "../store/useNotificatiosStore";

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAllAsRead } = useNotificationStore();

  return (
    <div>
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={() => setIsOpen(true)}
      >
        <Notification size="24" />
        {notifications.some((notification) => !notification.isRead) && (
          <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-secondary"></span>
        )}
      </button>

      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-box relative bg-white max-w-md p-6 rounded-lg"
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
              Tienes {notifications.filter((n) => !n.isRead).length} mensajes
              sin leer
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 items-start">
                {!notification.isRead ? (
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                ) : (
                  <div className="w-2 h-2 mt-2"></div>
                )}

                <div>
                  <p className="text-gray-900 mb-1">{notification.message}</p>
                  <p className="text-gray-500 text-sm">
                    {formatTimeAgo(notification.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary w-full flex gap-2 items-center justify-center"
            onClick={markAllAsRead}
          >
            <Sms size="24" /> Marcar todas como leídas
          </button>
        </div>
      </dialog>
    </div>
  );
}
