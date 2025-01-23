import { iupiApi } from "../../../data/api";

export const getGoals = async (userId) => {
  const { data } = await iupiApi.get(`/user/${userId}/goals`);
  return data;
};

export const createGoal = async (userId, goalData) => {
  const { data } = await iupiApi.post(`/user/${userId}/goals`, goalData);
  return data;
};
