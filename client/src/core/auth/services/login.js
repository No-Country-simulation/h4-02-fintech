import { iupiApi } from "../../../data/api";

export const loginWithEmail = async (credentials) => {
  const { data } = await iupiApi.post("/auth/login", credentials);
  return data;
};
