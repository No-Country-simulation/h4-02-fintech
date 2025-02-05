import axios from "axios";

export const convertUsdToArsOne = async (usdAmount) => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const exchangeRate = response.data.rates.ARS;
    return (usdAmount * exchangeRate).toFixed(2);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return "Error";
  }
};

export const convertArsToUsd = async (arsAmounts) => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const exchangeRate = 1 / response.data.rates.ARS;

    const usdValues = {};
    arsAmounts.forEach((amount, index) => {
      usdValues[index] = (amount * exchangeRate).toFixed(2);
    });

    return usdValues;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return {};
  }
};

export const convertUsdToArs = async (usdAmounts) => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const exchangeRate = response.data.rates.ARS;

    const arsValues = {};
    usdAmounts.forEach((amount, index) => {
      arsValues[index] = (amount * exchangeRate).toFixed(2);
    });

    return arsValues;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return {};
  }
};

