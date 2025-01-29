export const formatCurrency = (value, currencyType = "ARS", digits = 0) => {
  const options = {
    style: "currency",
    currency: currencyType === "USD" ? "USD" : "ARS",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  };

  return new Intl.NumberFormat("es-AR", options).format(parseFloat(value));
};
