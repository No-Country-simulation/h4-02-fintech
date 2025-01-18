export const validateComplete = (state) => {
  return Object.values(state).every((value) => {
    if (value === null || value === undefined) return false; // Verifica null o undefined
    if (typeof value === "string" && value.trim() === "") return false; // Verifica cadenas vacías
    if (Array.isArray(value) && value.length === 0) return false; // Verifica arrays vacíos
    return true; // Todos los demás valores son válidos
  });
};
