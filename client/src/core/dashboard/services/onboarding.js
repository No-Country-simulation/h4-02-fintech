import { iupiApi } from "../../../data/api";

export const updateOnboarding = async (newData) => {
  const { data } = await iupiApi.post("/onboarding", newData);
  return data;
};
