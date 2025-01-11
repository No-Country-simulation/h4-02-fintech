/**
 * Maneja errores de Axios y devuelve un mensaje de error comprensible.
 * @param {Object} error - El error lanzado por Axios.
 * @returns {string} - Un mensaje de error para mostrar al usuario.
 */

export const getErrorMessage = (error) => {
  if (error.code === "ERR_NETWORK") {
    // Caso: Error de red (problemas de conexión)
    return "No se pudo conectar con el servidor. Por favor, verifica tu conexión a Internet.";
  }

  if (error.code === "ECONNABORTED") {
    // Caso: La API no está respondiendo
    return "El servidor no está respondiendo. Por favor, intenta nuevamente más tarde.";
  }

  if (error.response?.data?.message) {
    // Caso: Mensaje de error específico enviado por el servidor
    return error.response.data.message;
  }

  // Caso: Error genérico o desconocido
  return "Ha ocurrido un error. Intenta nuevamente más tarde.";
};
