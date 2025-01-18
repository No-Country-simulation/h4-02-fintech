import { iupiApi } from "../../../data/api";

export const getProfile = async (id) => {
  const { data } = await iupiApi.get(`/user/${id}`);
  return data;
};

export const updateProfile = async (id, newData) => {
  const { data } = await iupiApi.put(`/user/${id}`, newData);
  return data;
};
