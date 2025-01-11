import { iupiApi } from "../../../data/api";

export const registerWithEmail = async (userData) => {
  const { data } = await iupiApi.post("/auth/register", userData);
  return data;
};
