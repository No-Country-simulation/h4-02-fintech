import { PropTypes } from "prop-types";
import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#004AAD", "#049276", "#F94646", "#3c3d3d"];

/**
 * Componente Reutilizable de PieChart
 * @param {Object[]} data - Datos para el gráfico. Ejemplo: [{ name: "A", percentage: 40 }, { name: "B", percentage: 60 }]
 * @param {string[]} colors - (Opcional) Colores personalizados.
 * @param {number} width - (Opcional) Ancho del gráfico.
 * @param {number} height - (Opcional) Altura del gráfico.
 */

export const PieChartWithPaddingAngle = ({
  data,
  colors = COLORS,
  width = 220,
  height = 240,
}) => {
  const [hoveredSector, setHoveredSector] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={100}
          cornerRadius={10}
          dataKey="percentage" // Usar percentage aquí
          label={false}
          labelLine={false}
          onMouseEnter={(e) => {
            setHoveredSector(`${e.payload.percentage}%`);
            setActiveLabel(e.payload.name);
          }}
          onMouseLeave={() => {
            setHoveredSector(null);
            setActiveLabel(null);
          }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              style={{
                transform:
                  hoveredSector && entry.name === hoveredSector
                    ? "scale(1.1)"
                    : "scale(1)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          ))}
        </Pie>

        {hoveredSector && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-semibold text-gray-900"
          >
            {hoveredSector}
          </text>
        )}
      </PieChart>

      <div className="mt-[-4rem] flex justify-center gap-8">
        {data.map((entry, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              activeLabel === entry.name
                ? "text-primary font-semibold"
                : "text-gray-400"
            }`}
          >
            <div className="flex justify-center items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              ></div>
              <span
                className={`text-md ${
                  activeLabel === entry.name ? "font-semibold" : ""
                }`}
              >
                {entry.name}
              </span>
            </div>
            <span className="text-sm text-gray-500">{entry.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartWithPaddingAngle.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  height: PropTypes.number,
};
