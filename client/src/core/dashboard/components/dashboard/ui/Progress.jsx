import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const Progress = ({ progress, total }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    setProgressValue(0);

    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= Math.min(progress, 100)) {
          clearInterval(interval);
          return Math.min(progress, 100);
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full relative">
      <progress
        className="progress w-full h-8 bg-gray-300"
        value={progressValue}
        max="100"
      ></progress>

      <div className="absolute inset-0 flex items-center justify-between ml-4 text-sm text-white font-bold mx-2">
        <span>{progressValue}% completado</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

Progress.propTypes = {
  progress: Number,
  total: Number,
};
