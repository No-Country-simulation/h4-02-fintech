import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { getFinancialSummary } from "../../../core/dashboard/services/financial";

export const EvolutionFinance = () => {
  const { user } = useAuthStore();
  const [summary, setSummary] = useState(null);

  const onHandleFinancialSummary = async () => {
    try {
      const newSummary = await getFinancialSummary(user.id);
      setSummary(newSummary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    onHandleFinancialSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterData = (dataset) => {
    if (!dataset) return [];
    const months = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
    ];
    const now = new Date();
    const currentYear = now.getFullYear();
    let filteredData = [];

    for (let i = 0; i < 12; i++) {
      const monthData = {
        month: months[i],
        income: 0,
        expenses: 0,
        savings: 0,
      };

      // Filtrar y sumar ingresos
      const incomeData = dataset.income?.filter(
        (d) =>
          new Date(d.date).getFullYear() === currentYear &&
          new Date(d.date).getMonth() === i
      );
      if (incomeData) {
        monthData.income = incomeData.reduce((acc, curr) => acc + curr.value, 0);
      }

      // Filtrar y sumar gastos
      const expensesData = dataset.expenses?.filter(
        (d) =>
          new Date(d.date).getFullYear() === currentYear &&
          new Date(d.date).getMonth() === i
      );
      if (expensesData) {
        monthData.expenses = expensesData.reduce((acc, curr) => acc + curr.value, 0);
      }

      // Filtrar y sumar ahorros
      const savingsData = dataset.savings?.filter(
        (d) =>
          new Date(d.date).getFullYear() === currentYear &&
          new Date(d.date).getMonth() === i
      );
      if (savingsData) {
        monthData.savings = savingsData.reduce((acc, curr) => acc + curr.value, 0);
      }

      filteredData.push(monthData);
    }

    return filteredData;
  };

  // Función personalizada para formatear el Tooltip
  const customTooltipFormatter = (value, name) => {
    let label;
    switch (name) {
      case "income":
        label = "Ingresos";
        break;
      case "expenses":
        label = "Gastos";
        break;
      case "savings":
        label = "Ahorros";
        break;
      default:
        label = name;
    }
    return [`$${value.toLocaleString()}`, label];
  };

  return (
    <div className="p-4 flex flex-col bg-white shadow-md rounded-xl mb-4">
      <h2 className="text-xl font-semibold ml-4">Evolución financiera</h2>

      <div className="my-4 flex justify-center w-full">
        <ResponsiveContainer width="100%" height={300}> {/* Reducimos la altura para móviles */}
          <BarChart
            data={summary ? filterData(summary) : []}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }} 
          >
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }} // Reducimos el tamaño de la fuente en móviles
            />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }} // Reducimos el tamaño de la fuente en móviles
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                fontSize: 12, // Reducimos el tamaño de la fuente en móviles
              }}
              formatter={customTooltipFormatter}
            />
            <Legend
              verticalAlign="bottom" // Movemos la leyenda al fondo en móviles
              align="center"
              layout="horizontal" // Leyenda horizontal en móviles
              iconSize={10}
              wrapperStyle={{ paddingTop: 10 }} // Ajustamos el espacio superior
            />
            <Bar dataKey="income" fill="#7B61FF" name="Ingresos" />
            <Bar dataKey="expenses" fill="#004AAD" name="Gastos" />
            <Bar dataKey="savings" fill="#6AB4A8" name="Ahorros" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};