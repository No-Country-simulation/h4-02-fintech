import { iupiApi } from "../../../data/api";

export const fetchNews = async () => {
  const { data } = await iupiApi.get(`/news`);
  return data;
};
