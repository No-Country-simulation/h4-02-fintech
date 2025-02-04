import { iupiApi } from "../../../data/api";

export const getFinancial = async (userId) => {
  const { data } = await iupiApi.get(
    `/user/${userId}/financial-radiography`
  );
  return data;
};

export const getFinancialSummary = async(userId) => {
  const { data } = await iupiApi.get(
    `/user/${userId}/financial-summary`
  );
  return data;
}