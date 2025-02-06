import { Chart } from "iconsax-react";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../core/validators/errorHandler";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { toast } from "sonner";
import { getOperations, getOperationsTotal } from "../services/instrument";
import useOperationsStore from "../store/useOperation";
import { convertUsdToArs } from "../../../core/services/exchange";

export const OperationsSection = () => {
  const { user } = useAuthStore();
  const [operations, setOperations] = useState([]);
  const [operationsTotal, setOperationsTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setOperations: setOperationsStore } = useOperationsStore();
  const [usdValues, setUsdValues] = useState({});

  const onHandleOperations = async () => {
    try {
      const dataOperations = await getOperations(user.id);
      setOperations(dataOperations.reverse());

      // Obtener todos los totales en ARS
      const arsAmounts = dataOperations.map((operation) => operation.total);

      // Convertir todos los valores a USD en una sola llamada
      const usdValues = await convertUsdToArs(arsAmounts);

      // Crear un objeto con los valores convertidos usando el ID de la operación como clave
      const usdValuesMap = {};
      dataOperations.forEach((operation, index) => {
        usdValuesMap[operation.id] = usdValues[index];
      });

      setUsdValues(usdValuesMap);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const onHandleOperationsTotal = async () => {
    try {
      const dataOperations = await getOperationsTotal(user.id);
      setOperationsTotal(dataOperations.reverse());
      setOperationsStore(dataOperations.reverse());
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    onHandleOperations();
    onHandleOperationsTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Chart size="24" className="text-primary" />
        <h3 className="text-xl font-medium text-primary">Operaciones</h3>
      </div>

      {isLoading ? (
        <div className="bg-base-200 rounded-xl p-6 animate-pulse">
          <div className="mb-4 h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          {/* Tabla de operaciones totales (primero) */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Monedas</h4>
            {operationsTotal.length === 0 ? (
              <div className="bg-base-200 rounded-xl p-6 text-center">
                <p className="mb-2">No tienes monedas registradas.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra min-w-full rounded-xl">
                  <thead>
                    <tr>
                      <th className="p-3 text-left">Moneda</th>
                      <th className="p-3 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operationsTotal.map((operation) => (
                      <tr key={operation.coin}>
                        <td className="p-3">{operation.coin}</td>
                        <td className="p-3">{operation.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tabla de operaciones del día (después de la total) */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Operaciones</h4>
            {operations.length === 0 ? (
              <div className="bg-base-200 rounded-xl p-6 text-center">
                <p className="mb-2">Hoy no realizaste operaciones.</p>
                <p>Las órdenes que operes, las verás reflejadas acá.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra min-w-full rounded-xl">
                  <thead>
                    <tr>
                      <th className="p-3 text-left">Moneda</th>
                      <th className="p-3 text-left">Valor (USD)</th>
                      <th className="p-3 text-left">Valor (ARS)</th>
                      <th className="p-3 text-left">Cantidad</th>
                      <th className="p-3 text-left">Total (USD)</th>
                      <th className="p-3 text-left">Total (ARS)</th>
                      <th className="p-3 text-left">Fecha</th>
                      <th className="p-3 text-left">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operations.map((operation) => (
                      <tr key={operation.id}>
                        <td className="p-3">{operation.coin}</td>
                        <td className="p-3">{operation.value}</td>
                        <td className="p-3">
                          {usdValues[operation.id] || "Calculando..."}
                        </td>
                        <td className="p-3">{operation.quantity}</td>
                        <td className="p-3">{operation.total}</td>
                        <td className="p-3">
                          {usdValues[operation.id] || "Calculando..."}
                        </td>
                        <td className="p-3">{operation.date}</td>
                        <td className="p-3">
                          {operation.state === "BY" ? "Comprado" : "Vendido"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
