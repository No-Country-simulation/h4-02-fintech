import { iupiApi } from "../../../data/api";

export const loginWithEmail = async (credentials) => {
  const { data } = await iupiApi.post("/auth/login", credentials);
  return data;
};

export const sendForgotPasswordEmail = async (email) => {
  const { data } = await iupiApi.post("/forgot-password", { email });
  return data;
};

export const resetPassword = async (token, password) => {
  const { data } = await iupiApi.post("/reset-password", { password, token });
  return data;
};
