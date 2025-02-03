import { Graph } from "iconsax-react";
import { FinancialXModal } from "./FinancialXModal";

export const FinancialSection = () => {
  return (
    <div className="flex p-4 space-y-8 sm:border-2 sm:p-2 sm:rounded-xl sm:items-center">
      <div className="flex flex-col space-y-2 p-2 w-full">
        <div className="flex items-center gap-2">
          <Graph size="24" className="text-primary" />
          <h3 className="text-xl font-medium text-primary">
            Radiografía Financiera
          </h3>
        </div>

        <p className="text-base text-gray-600">
          Actualiza tus datos para obtener recomendaciones más personalizadas.
        </p>

        <FinancialXModal />
      </div>
    </div>
  );
};
