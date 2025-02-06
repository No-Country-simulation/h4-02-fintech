import { iupiApi } from "../../../data/api";

export const getUsers = async () => {
  const { data } = await iupiApi.get(`/user`);
  return data;
};
