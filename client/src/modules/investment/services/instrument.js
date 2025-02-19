import { iupiApi } from "../../../data/api";

export const getByInstrument = async (coin) => {
  const { data } = await iupiApi.get(`/exchange/all/${coin}`);
  return data;
};

export const getInstrument = async (coin) => {
  const { data } = await iupiApi.get(`/exchange/description/${coin}`);
  return data;
};

export const getPrice = async (coin) => {
  const { data } = await iupiApi.get(`/exchange/price`, {
    params: {
      coin,
    },
  });
  return data;
};

export const buyExchage = async (exchange) => {
  const { data } = await iupiApi.post(`/exchange`, exchange);
  return data;
};

export const sellExchage = async (exchange) => {
  const { data } = await iupiApi.post(`/exchange/sell`, exchange);
  return data;
};


export const getOperations = async (userId) => {
  const { data } = await iupiApi.get(`/exchange/${userId}`);
  return data;
};


export const getOperationsTotal = async (userId) => {
  const { data } = await iupiApi.get(`/exchange/total/${userId}`);
  return data;
};
