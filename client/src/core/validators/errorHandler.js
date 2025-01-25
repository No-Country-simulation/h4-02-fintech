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

  if (error.code === "ETIMEDOUT") {
    // Caso: El servidor no responde en el tiempo esperado
    return "La solicitud al servidor ha expirado. Por favor, verifica tu conexión y vuelve a intentarlo.";
  }

  if (error.code === "EHOSTUNREACH") {
    // Caso: El servidor está inalcanzable
    return "El servidor no está disponible. Por favor, verifica tu conexión o intenta más tarde.";
  }

  if (error.code === "ECONNREFUSED") {
    // Caso: La conexión fue rechazada por el servidor
    return "La conexión al servidor fue rechazada. Es posible que el servidor esté fuera de servicio.";
  }

  if (error.code === "ENETUNREACH") {
    // Caso: La red es inalcanzable
    return "La red no está disponible. Por favor, verifica tu conexión a Internet.";
  }

  if (error.code === "ESOCKETTIMEDOUT") {
    // Caso: Tiempo de espera de socket agotado
    return "El tiempo de espera de la conexión se ha agotado. Por favor, intenta nuevamente.";
  }

  if (error.response) {
    if (error.response.status >= 500) {
      // Caso: Error del servidor
      return "El servidor está experimentando problemas. Por favor, intenta más tarde.";
    }

    if (error.response.data?.message) {
      // Caso: Mensaje de error específico enviado por el servidor
      return error.response.data.message;
    }
  }

  if (error.request) {
    // Caso: No se recibió respuesta del servidor
    return "No se recibió respuesta del servidor. Por favor, intenta nuevamente.";
  }

  // Caso: Error genérico o desconocido
  return "Ha ocurrido un error inesperado. Intenta nuevamente más tarde.";
};
