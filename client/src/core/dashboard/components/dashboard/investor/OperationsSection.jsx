import { Chart } from "iconsax-react";

export const OperationsSection = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Chart size="24" />
        <h3 className="text-xl font-medium text-gray-800">
          Operaciones del día
        </h3>
      </div>

      <div className="bg-neutral rounded-xl p-6 text-center">
        <p className="mb-2">Hoy no realizaste operaciones.</p>
        <p>Las órdenes que operes en el día, las verás reflejadas acá.</p>
      </div>
    </div>
  );
};
