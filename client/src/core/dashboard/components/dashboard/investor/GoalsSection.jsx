import { Airplane, ArrowDown2 } from "iconsax-react";
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
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Airplane size="24" className="text-primary" />
          <h3 className="text-xl font-medium text-gray-800">Vacaciones 2025</h3>
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
          <button className="btn btn-sm btn-ghost" aria-label="Expand">
            <ArrowDown2 size="20" />
          </button>
        </div>

        <p className="text-base font-semibold text-gray-600">
          ¡Gran avance! Tu consistencia está dando frutos.
        </p>
      </div>
    </div>
  );
};
