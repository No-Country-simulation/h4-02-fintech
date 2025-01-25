import { iupiApi } from "../../../data/api";

export const getNotifications = async (userId, page, size = 3) => {
  const { data } = await iupiApi.get(`/user/${userId}/notification`, {
    params: {
      page,
      size,
    },
  });

  return data;
};

export const postMarkAsRead = async (userId, notificationId) => {
  const { data } = await iupiApi.post(
    `/user/${userId}/notification/${notificationId}/mark-as-read`
  );

  return data;
};

export const postMarkAllAsRead = async (userId, ids) => {
  const { data } = await iupiApi.post(
    `/user/${userId}/notification/mark-as-read`,
    {
      notificationIds: ids,
    }
  );

  return data;
};
