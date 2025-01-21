import { iupiApi } from "../../../data/api";

export const createTransaction = async (newData) => {
  const { data } = await iupiApi.post("/wallet", newData);
  return data;
};
