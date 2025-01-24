import { PropTypes } from "prop-types";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const PerformanceChart = ({ performanceData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1W"); // Estado para el período seleccionado

  // Definir los botones de período
  const timeButtons = ["1W", "1M", "1Y", "3Y"];

  // Función para obtener la data según el período seleccionado
  const getDataForPeriod = (period) => {
    return performanceData[period] || []; // Devolver la data del período seleccionado
  };

  const filteredData = getDataForPeriod(selectedPeriod); // Filtrar los datos según el período

  return (
    <div>
      {/* Selector de Período */}
      <div className="flex gap-2 mb-6 bg-cyan-50 p-2 rounded-full">
        {timeButtons.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)} // Cambiar el estado al seleccionar un período
            className={`flex-1 py-2 px-4 rounded-full text-center 
              ${selectedPeriod === period ? "bg-white shadow-sm" : ""}`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />{" "}
          {/* Aquí usamos "day" como el campo en el eje X */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

//Prop-types
PerformanceChart.propTypes = {
  performanceData: PropTypes.object.isRequired,
};
