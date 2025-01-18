export const formatCurrency = (value, currencyType = "ARS") => {
  if (!value) return "";

  const options = {
    style: "currency",
    currency: currencyType === "USD" ? "USD" : "ARS",
    maximumFractionDigits: 0,
  };

  return new Intl.NumberFormat("es-AR", options).format(parseInt(value));
};
