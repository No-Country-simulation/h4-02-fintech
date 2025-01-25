export const formatTimeAgo = (date) => {
  const now = new Date();
  const difference = Math.floor((now - date) / 1000);

  if (difference < 60) return "Hace unos segundos";
  if (difference < 3600) {
    const minutes = Math.floor(difference / 60);
    return `Hace ${minutes} minuto${minutes === 1 ? "" : "s"}`;
  }
  if (difference < 86400) {
    const hours = Math.floor(difference / 3600);
    return `Hace ${hours} hora${hours === 1 ? "" : "s"}`;
  }
  const days = Math.floor(difference / 86400);
  return `Hace ${days} día${days === 1 ? "" : "s"}`;
};
