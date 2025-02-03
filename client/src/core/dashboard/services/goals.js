import { iupiApi } from "../../../data/api";

export const getGoals = async (userId) => {
  const { data } = await iupiApi.get(`/user/${userId}/goals`);
  return data;
};

export const createGoal = async (userId, goalData) => {
  const { data } = await iupiApi.post(`/user/${userId}/goals`, goalData);
  return data;
};

export const createContribution = async (userId, goalId, contributionData) => {
  const { data } = await iupiApi.post(
    `/user/${userId}/goals/${goalId}/contribution`,
    contributionData
  );
  return data;
};

export const updateGoal = async (userId, goalId, goalData) => {
  const { data } = await iupiApi.put(
    `/user/${userId}/goals/${goalId}`,
    goalData
  );
  return data;
};
