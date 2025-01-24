import { Chart } from "iconsax-react";

export const OperationsSection = () => {
  return (
    <div className="space-y-4 p-4 sm:border-2 sm:p-2 flex flex-col sm:justify-center">
      <div className="flex items-center gap-2">
        <Chart size="24" className="text-primary"/>
        <h3 className="text-xl font-medium text-primary">
          Operaciones del día
        </h3>
      </div>

      <div className="bg-base-200 rounded-xl p-6 text-center">
        <p className="mb-2">Hoy no realizaste operaciones.</p>
        <p>Las órdenes que operes en el día, las verás reflejadas acá.</p>
      </div>
    </div>
  );
};
