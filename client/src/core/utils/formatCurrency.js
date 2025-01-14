export const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("es-AR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(parseInt(value));
};
