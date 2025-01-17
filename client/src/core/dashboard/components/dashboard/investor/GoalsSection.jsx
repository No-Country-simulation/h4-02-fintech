import { Airplane, Card, Setting, User } from "iconsax-react";
import { useEffect, useState } from "react";

export const GoalsSection = () => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 50) {
          clearInterval(interval);
          return 50;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 space-y-8">
      <ul className="menu menu-horizontal bg-base-200 rounded-box w-full">
        <li className="w-full">
          <details>
            <summary className="flex">
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                  <Airplane size="24" className="text-primary" />
                  <h3 className="text-xl font-medium text-gray-800">
                    Vacaciones 2025
                  </h3>
                </div>

                <div className="flex items-center">
                  <div className="w-full relative">
                    <progress
                      className="progress w-full h-8 bg-gray-300"
                      value={progressValue}
                      max="100"
                    ></progress>
                    <p className="absolute inset-0 flex items-center justify-start ml-4 text-sm text-white font-bold">
                      {progressValue}% completado
                    </p>
                  </div>
                </div>
              </div>
            </summary>
            <ul>
              <li>
                <details>
                  <summary>
                    <User size="16" /> Fecha límite
                  </summary>
                  <ul>
                    <li>
                      <a>Próxima meta: 30 de junio de 2025</a>
                    </li>
                    <li>
                      <a>Tiempo restante: 1 año y 5 meses</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>
                    <Card size="16" /> Historial de aportes
                  </summary>
                  <ul>
                    <li>
                      <a>Aporte mensual: $500 USD</a>
                    </li>
                    <li>
                      <a>Último aporte: 15 de enero de 2025</a>
                    </li>
                    <li>
                      <a>Total acumulado: $8,500 USD</a>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>
                    <Setting size="16" /> Sugerencias
                  </summary>
                  <ul>
                    <li>
                      <a>Incrementa tu ahorro mensual en un 10%</a>
                    </li>
                    <li>
                      <a>
                        Invierte en fondos de bajo riesgo para mayor seguridad
                      </a>
                    </li>
                    <li>
                      <a>Revisa las comisiones de tu cuenta de ahorro</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <p className="text-base font-semibold text-gray-600">
        ¡Gran avance! Tu consistencia está dando frutos.
      </p>
    </div>
  );
};
