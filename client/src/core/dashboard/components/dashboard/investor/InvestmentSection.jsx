import { MoneyRecive } from "iconsax-react";

export const InvestmentSection = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MoneyRecive size="24" />
          <h3 className="text-xl font-medium text-gray-800">
            Inversiones recomendadas
          </h3>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Plazo Fijo en Dólares
          </h4>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-sm text-gray-600">Nivel de riesgo</p>
              </div>
              <p className="text-sm text-gray-400 ml-4">Conservador</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-sm text-gray-600">Rendimiento estimado</p>
              </div>
              <p className="text-sm text-gray-400 ml-4">3 % anual</p>
            </div>

            <button className="btn btn-neutral w-full">
              Explorar más detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
