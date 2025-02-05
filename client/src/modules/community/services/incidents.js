import { iupiApi } from "../../../data/api";

export const fetchIncidents = async () => {
  const { data } = await iupiApi.get(`/queries/error`);
  return data;
};

export const fetchIncidentCount = async () => {
  const { data } = await iupiApi.get(`/queries/error/count`);
  return data;
};
