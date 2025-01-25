import { PropTypes } from "prop-types";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const PerformanceChart = ({ performanceData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1W"); // Estado para el período seleccionado

  // Definir los botones de período
  const timeButtons = ["1W", "1M", "1Y", "3Y"];

  // Función para obtener la data según el período seleccionado
  const getDataForPeriod = (period) => {
    return performanceData[period] || [];
  };

  const filteredData = getDataForPeriod(selectedPeriod);

  return (
    <div className="shadow-md rounded-2xl p-4 bg-white mb-4">
      {/* Selector de Período */}
      <div className="flex gap-2 mb-6 bg-cyan-50 p-2 rounded-full">
        {timeButtons.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 py-2 px-4 rounded-full text-center 
              ${selectedPeriod === period ? "bg-white shadow-sm" : ""}`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(value) => `$${value}`} />{" "}
          {/* Formateador para mostrar $ */}
          <Tooltip formatter={(value) => `$${value}`} />{" "}
          {/* Formatear también en el tooltip */}
          {/* Área principal */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#004AAD"
            fill="#004AAD"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

//Prop-types
PerformanceChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};
