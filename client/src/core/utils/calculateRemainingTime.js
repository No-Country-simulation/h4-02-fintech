export const calculateRemainingTime = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);

  const diffMs = target - now;

  if (diffMs <= 0) return "Tiempo expirado";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} año${years > 1 ? "s" : ""} y ${months % 12} mes${
      months % 12 > 1 ? "es" : ""
    }`;
  } else if (months > 0) {
    return `${months} mes${months > 1 ? "es" : ""} y ${days % 30} día${
      days % 30 > 1 ? "s" : ""
    }`;
  } else {
    return `${days} día${days > 1 ? "s" : ""}`;
  }
};
