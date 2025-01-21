import { useEffect, useState } from "react";

export const Progress = ({ progress }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= progress) {
          clearInterval(interval);
          return progress;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

Progress.propTypes = {
  progress: Number,
};
