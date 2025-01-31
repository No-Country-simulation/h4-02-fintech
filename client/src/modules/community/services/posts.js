import { iupiApi } from "../../../data/api";

export const fetchPosts = async (page = 0, size = 5) => {
  const { data } = await iupiApi.get(`/forum?page=${page}&size=${size}`);
  return data;
};

export const publishPost = async (content) => {
  const body = { content };
  const { data } = await iupiApi.post("/forum/publish", body);
  return data;
};
