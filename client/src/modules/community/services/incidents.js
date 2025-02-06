import { iupiApi } from "../../../data/api";

export const fetchIncidents = async () => {
  const { data } = await iupiApi.get(`/queries/error`);
  return data;
};

export const fetchIncidentCount = async () => {
  const { data } = await iupiApi.get(`/queries/error/count`);
  return data;
};

export const createIncidence = async (userId, affectedArea, description) => {
  const body = {
    userId,
    affectedArea,
    description,
    lastUpdate:
      "Se ha notificado al equipo de desarrollo para investigar la conexión con la API.",
    takenActions: [
      "Verificación de logs de errores.",
      "Reinicio de la sincronización manual.",
      "Esperando respuesta del proveedor de la API.",
    ],
    assignedTo: "Lionel Staricoff (Desarrollo Backend)",
    estimated: "2 horas",
  };
  const { data } = await iupiApi.post(`/queries/error`, body);
  return data;
};
