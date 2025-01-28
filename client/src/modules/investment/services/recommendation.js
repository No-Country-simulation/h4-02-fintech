import { iupiApi } from "../../../data/api";

export const getRecommendations = async () => {
  const { data } = await iupiApi.get(`/recommendations/stocks`);
  return data;
};
