import { useState, useEffect } from "react";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getFinancialSummary } from "../../../services/financial";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFinancialStore } from "../../../store/useFinancialStore";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const TransactionSection = () => {
    const { user } = useAuthStore();
    const { financial, currencyType } = useFinancialStore();
    const [summary, setSummary] = useState(null);
    const [filter, setFilter] = useState("month");
    const [selectedCategory, setSelectedCategory] = useState("income");

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

    const filterData = (dataset, filter) => {
        if (!dataset) return [];
        const now = new Date();
        let filteredData = [];

        if (filter === "week") {
            const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
            for (let i = 6; i >= 0; i--) {
                const day = new Date(now);
                day.setDate(now.getDate() - i);
                const found = dataset.find(d => new Date(d.date).toDateString() === day.toDateString());
                filteredData.push({ date: daysOfWeek[day.getDay()], value: found ? found.value : 0, realDate: day.toLocaleDateString() });
            }
        } else if (filter === "month") {
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            for (let i = 6; i >= 0; i--) {
                const month = new Date(now);
                month.setMonth(now.getMonth() - i);
                const found = dataset.find(d => new Date(d.date).getMonth() === month.getMonth());
                filteredData.push({ date: months[month.getMonth()], value: found ? found.value : 0, realDate: month.toLocaleDateString() });
            }
        } else if (filter === "year") {
            for (let i = 2; i >= 0; i--) {
                const year = now.getFullYear() - i;
                const found = dataset.find(d => new Date(d.date).getFullYear() === year);
                filteredData.push({ date: year.toString(), value: found ? found.value : 0, realDate: new Date(year, 0, 1).toLocaleDateString() });
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
                        className={`tab ${filter === "week" ? "tab-active text-primary" : "text-gray-400"}`}
                        onClick={() => setFilter("week")}
                    >Semana</button>
                    <button
                        className={`tab ${filter === "month" ? "tab-active text-primary" : "text-gray-400"}`}
                        onClick={() => setFilter("month")}
                    >Mes</button>
                    <button
                        className={`tab ${filter === "year" ? "tab-active text-primary" : "text-gray-400"}`}
                        onClick={() => setFilter("year")}
                    >Año</button>
                </div>
            </div>
            {
                selectedCategory === "income" && <h2 className="text-xl font-semibold ml-4">
                    {financial.income.values == 0
                        ? "$ 0,00"
                        : formatCurrency(financial.income.values[currencyType], currencyType, 2)}
                </h2>
            }
            {
                selectedCategory === "expenses" && <h2 className="text-xl font-semibold ml-4">
                    {financial.fixedExpenses.values == 0
                        ? "$ 0,00"
                        : formatCurrency(financial.fixedExpenses.values[currencyType], currencyType, 2)}
                </h2>
            }
            {
                selectedCategory === "savings" && <h2 className="text-xl font-semibold ml-4">
                    {financial.savings.values == 0
                        ? "$ 0,00"
                        : formatCurrency(financial.savings.values[currencyType], currencyType, 2)}
                </h2>
            }

            <div className="p-4 sm:p-6 my-4">

                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={summary ? filterData(summary[selectedCategory], filter) : []}>
                        <XAxis dataKey="date" />
                        <YAxis
                            tickFormatter={(value) => `$${value}`}  // Agrega el símbolo de dólar
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: "10px" }}
                            formatter={(value,) => [`$${value}`, `${selectedCategory === "income" ? "Ingreso" : selectedCategory === "expenses" ? "Egreso" : "Ahorro"}`]}
                            labelFormatter={(label, payload) => {
                                if (payload && payload.length > 0) {
                                    return `${payload[0].payload.realDate}`;
                                }
                                return `${label}`;
                            }}
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