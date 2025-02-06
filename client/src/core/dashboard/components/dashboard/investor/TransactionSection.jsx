import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getFinancialSummary } from "../../../services/financial";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFinancialStore } from "../../../store/useFinancialStore";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const TransactionSection = () => {
  const { user } = useAuthStore();
  const { financial: fin, currencyType, show } = useFinancialStore();
  const financial = { ...fin, expenses: fin.fixedExpenses };
  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState("week");
  const [selectedCategory, setSelectedCategory] = useState("income");
  const [exchangeRate, setExchangeRate] = useState(1);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setExchangeRate(1 / response.data.rates.ARS);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

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
    if (currencyType === "USD") fetchExchangeRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyType]);

  const filterData = (dataset, filter) => {
    if (!dataset) return [];

    const now = new Date();
    let filteredData = [];

    if (filter === "week") {
      const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
      for (let i = 6; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        const dayString = day.toISOString().split("T")[0]; // Solo la fecha (YYYY-MM-DD)

        const found = dataset.find((d) => d.date.split("T")[0] === dayString);
        const value = found ? found.value : 0;

        filteredData.push({
          date: daysOfWeek[day.getDay()],
          value: currencyType === "USD" ? value * exchangeRate : value,
          realDate: day.toLocaleDateString(),
        });
      }
    } else if (filter === "month") {
      const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      for (let i = 6; i >= 0; i--) {
        const month = new Date(now);
        month.setMonth(now.getMonth() - i);
        const monthIndex = month.getMonth();
        const monthYear = month.getFullYear();

        // Filtrar todos los datos de ese mes y año
        const monthData = dataset.filter((d) => {
          const dDate = new Date(d.date);
          return (
            dDate.getMonth() === monthIndex && dDate.getFullYear() === monthYear
          );
        });

        // Obtener la suma de los valores del mes
        const totalValue = monthData.reduce((sum, d) => sum + d.value, 0);

        filteredData.push({
          date: months[monthIndex],
          value:
            currencyType === "USD" ? totalValue * exchangeRate : totalValue,
          realDate: new Date(monthYear, monthIndex, 1).toLocaleDateString(),
        });
      }
    } else if (filter === "year") {
      for (let i = 2; i >= 0; i--) {
        const year = now.getFullYear() - i;

        // Filtrar todos los datos de ese año
        const yearData = dataset.filter(
          (d) => new Date(d.date).getFullYear() === year
        );

        // Obtener la suma de los valores del año
        const totalValue = yearData.reduce((sum, d) => sum + d.value, 0);

        filteredData.push({
          date: year.toString(),
          value:
            currencyType === "USD" ? totalValue * exchangeRate : totalValue,
          realDate: new Date(year, 0, 1).toLocaleDateString(),
        });
      }
    }

    return filteredData;
  };

  return (
    <div className="p-4 flex flex-col bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center">
        <select
          className="select select-ghost w-40"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="income">Ingresos</option>
          <option value="expenses">Gastos</option>
          <option value="savings">Ahorros</option>
        </select>
        <div className="tabs font-semibold">
          <button
            className={`tab ${
              filter === "week" ? "tab-active text-primary" : "text-gray-400"
            }`}
            onClick={() => setFilter("week")}
          >
            Semana
          </button>
          <button
            className={`tab ${
              filter === "month" ? "tab-active text-primary" : "text-gray-400"
            }`}
            onClick={() => setFilter("month")}
          >
            Mes
          </button>
          <button
            className={`tab ${
              filter === "year" ? "tab-active text-primary" : "text-gray-400"
            }`}
            onClick={() => setFilter("year")}
          >
            Año
          </button>
        </div>
      </div>

      {selectedCategory === "income" && (
        <h2 className="text-xl font-semibold ml-4">
          {financial.income.values === 0
            ? "$ 0,00"
            : show
            ? formatCurrency(
                financial.income.values[currencyType],
                currencyType,
                2
              )
            : "$ x,xx"}
        </h2>
      )}
      {selectedCategory === "expenses" && (
        <h2 className="text-xl font-semibold ml-4">
          {financial.fixedExpenses.values === 0
            ? "$ 0,00"
            : show
            ? formatCurrency(
                financial.fixedExpenses.values[currencyType],
                currencyType,
                2
              )
            : "$ x,xx"}
        </h2>
      )}
      {selectedCategory === "savings" && (
        <h2 className="text-xl font-semibold ml-4">
          {financial.savings.values === 0
            ? "$ 0,00"
            : show
            ? formatCurrency(
                financial.savings.values[currencyType],
                currencyType,
                2
              )
            : "$ x,xx"}
        </h2>
      )}

      <div className="my-4 flex justify-center w-full">
        <ResponsiveContainer height={260}>
          <AreaChart
            data={summary ? filterData(summary[selectedCategory], filter) : []}
            className="p-4 sm:p-6"
          >
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ borderRadius: "10px" }}
              formatter={(value) => [
                `$${value}`,
                selectedCategory === "income"
                  ? "Ingreso"
                  : selectedCategory === "expenses"
                  ? "Egreso"
                  : "Ahorro",
              ]}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.realDate || label
              }
            />
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
    </div>
  );
};
