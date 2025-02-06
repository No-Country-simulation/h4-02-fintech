import { iupiApi } from "../../../data/api";

export const getRadiography = async (userId) => {
  const { data } = await iupiApi.get(`/user/${userId}/financial-profile`);
  return data;
};

export const createOrUpdateRadiography = async (userId, radiography) => {
  const { data } = await iupiApi.post(
    `/user/${userId}/financial-profile`,
    radiography
  );
  return data;
};
