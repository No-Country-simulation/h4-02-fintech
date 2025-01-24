import { ArrowLeft, ArrowRight, Heart } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { PerformanceChart } from "../../../../core/dashboard/components/dashboard/ui/PerformanceChart";

const instrument = {
  id: "AE38",
  name: "AE38",
  price: "ARS 827,30",
  change: "ARS 2,5076",
  changePercent: "0,38 %",
  isPositive: true,
  annualRendimentPercent: "7.5%",
  performance: {
    "1W": [
      {
        day: "Lunes",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Martes",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Miércoles",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Jueves",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Viernes",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Sábado",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Domingo",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
    ],
    "1M": [
      {
        day: "01-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "02-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "03-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "04-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "05-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "06-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "07-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "08-01",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
    ],
    "1Y": [
      {
        day: "Enero",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Febrero",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Marzo",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Abril",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      { day: "Mayo", value: Math.floor(Math.random() * (830 - 500 + 1)) + 500 },
      {
        day: "Junio",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
      {
        day: "Julio",
        value: Math.floor(Math.random() * (830 - 500 + 1)) + 500,
      },
    ],
    "3Y": [
      { day: "2025", value: Math.floor(Math.random() * (830 - 500 + 1)) + 500 },
      { day: "2026", value: Math.floor(Math.random() * (830 - 500 + 1)) + 500 },
      { day: "2027", value: Math.floor(Math.random() * (830 - 500 + 1)) + 500 },
      { day: "2028", value: Math.floor(Math.random() * (830 - 500 + 1)) + 500 },
    ],
  },

  compareData: [
    { instrument: "AE38 USD 2038", yield: "7,5 %", risk: "Moderado" },
    { instrument: "GD30 USD 2030", yield: "8,1 %", risk: "Moderado" },
    { instrument: "AL30 USD 2030", yield: "7,3 %", risk: "Arriesgado" },
    { instrument: "Fondo XYZ Global", yield: "6,8", risk: "Conservador" },
  ],
};

export const InstrumentDetailsPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  if (!type || !id) navigate("/dashboard/investment");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary px-4 py-4 text-white">
        <div className="flex items-center gap-4 mb-2">
          <button
            className="btn btn-ghost btn-square p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold">
            {type === "bond" && "Bonos"}
            {type === "fund" && "Fondos"}
            {type === "cedear" && "Cdears"}
            {type === "action" && "Acciones"}
          </h1>
        </div>
        <h2 className="text-2xl font-semibold">{id}</h2>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Bond Title and Favorite */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{id}</h3>
          <button className="btn btn-ghost btn-square">
            <Heart className="w-6 h-6" />
          </button>
        </div>

        {/* Price and Change */}
        <div className="mb-6">
          <div className="text-primary text-4xl font-bold mb-2">
            {instrument.price}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{instrument.change}</span>
            <div className="flex items-center text-green-500">
              <div className="flex items-center justify-end gap-1">
                {instrument.isPositive === true ? (
                  <ArrowRight className="w-4 h-4 text-green-500" />
                ) : instrument.isPositive === false ? (
                  <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                )}
                <span
                  className={`${
                    instrument.isPositive === true ? "text-green-500" : ""
                  } ${instrument.isPositive === false ? "text-red-500" : ""} ${
                    instrument.isPositive === null ? "text-gray-400" : ""
                  }`}
                >
                  {instrument.changePercent}
                </span>
              </div>
            </div>
          </div>
          <div className="text-xl">
            Rendimiento Bruto Anual: {instrument.annualRendimentPercent}
          </div>
        </div>

        <PerformanceChart performanceData={instrument.performance} />

        {/* Comparative Table */}
        <div className="mb-6">
          <h3 className="text-blue-700 text-xl font-bold mb-4">
            Tabla Comparativa
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-gray-500">Instrumento</th>
                  <th className="text-gray-500">Rendimiento Anual %</th>
                  <th className="text-gray-500">Nivel de Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {instrument.compareData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">{item.instrument}</td>
                    <td className="py-4">{item.yield}</td>
                    <td className="py-4">{item.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="btn btn-primary flex-1 text-lg">Comprar</button>
          <button className="btn btn-primary flex-1 text-lg">Vender</button>
        </div>
      </div>
    </div>
  );
};
