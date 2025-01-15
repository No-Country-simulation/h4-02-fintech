import { Graph } from "iconsax-react";

export const FinancialSection = () => {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Graph size="24" />
          <h3 className="text-xl font-medium text-gray-800">
            Radiografía Financiera
          </h3>
        </div>

        <p className="text-base text-gray-600">
          Actualiza tus datos para obtener recomendaciones más personalizadas.
        </p>

        <button className="btn btn-primary w-full">
          Actualizar mi Radiografía
        </button>
      </div>
    </div>
  );
};
