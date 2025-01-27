import { ArrowLeft, ArrowRight } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { PerformanceChart } from "../../../../core/dashboard/components/dashboard/ui/PerformanceChart";
import { useEffect, useState } from "react";
import { getPrice } from "../../services/instrument";
import CreateInvestmentModal from "../../components/CreateInvestmentModal";

export const InstrumentDetailsPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [instrument, setInstrument] = useState(null);

  useEffect(() => {
    if (!type || !id) {
      navigate("/dashboard/investment");
    } else {
      onHandleInstrumentDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, navigate]);

  const onHandleInstrumentDetails = async () => {
    try {
      const priceData = await getPrice(id.replace(/-/g, "/"));

      if (priceData?.message?.includes("plan")) {
        setInstrument({ error: "Detalles Premium" });
      } else if (priceData?.message?.includes("missing or invalid")) {
        setInstrument({ error: "No se encontraron datos" });
      } else {
        const graphHighPrice = priceData.values[0]?.open + 100;
        const graphLowPrice = priceData.values[0]?.close - 100;
        const highPrice = priceData.values[0]?.high;
        const lowPrice = priceData.values[0]?.low;
        const datetime = new Date(priceData.values[0]?.datetime);

        const generatePerformanceData = (interval, count) => {
          const spanishWeekdays = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
          ];
          const spanishMonths = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
          ];

          return Array.from({ length: count }, (_, i) => {
            const date = new Date(datetime);
            if (interval === "days") date.setDate(datetime.getDate() - (i + 1));
            if (interval === "months")
              date.setMonth(datetime.getMonth() - (i + 1));
            if (interval === "years")
              date.setFullYear(datetime.getFullYear() - (i + 1));

            const dayOfWeek = spanishWeekdays[date.getDay()];
            const monthName = spanishMonths[date.getMonth()];

            const randomValue =
              Math.random() *
                (Math.max(graphHighPrice, graphLowPrice) -
                  Math.min(graphHighPrice, graphLowPrice)) +
              Math.min(graphHighPrice, graphLowPrice);

            return {
              day:
                interval === "days"
                  ? dayOfWeek
                  : interval === "months"
                  ? monthName
                  : date.getFullYear(),
              value: Math.max(0, randomValue).toFixed(2), // Garantiza que no sea negativo
            };
          }).reverse();
        };

        const generatePerformanceFor1M = () => {
          const dates = [];
          for (let i = 1; i <= 4; i++) {
            const date = new Date(datetime);
            date.setDate(datetime.getDate() - i * 7);
            dates.push({
              day: date.toISOString().split("T")[0],
              value: (
                Math.random() *
                  (Math.max(graphHighPrice, graphLowPrice) -
                    Math.min(graphHighPrice, graphLowPrice)) +
                Math.min(graphHighPrice, graphLowPrice)
              ).toFixed(2),
            });
          }
          return dates.reverse();
        };

        const transformedData = {
          id: priceData.meta.symbol,
          name: priceData.meta.symbol,
          price: `$${lowPrice}`,
          change: `$${(lowPrice - highPrice).toFixed(2)}`,
          changePercent: `${(
            ((lowPrice - highPrice) / highPrice) *
            100
          ).toFixed(2)}%`,
          isPositive: lowPrice >= highPrice,
          performance: {
            "1W": [
              ...generatePerformanceData("days", 7),
              { day: "hoy", value: Number(lowPrice).toFixed(2) },
            ],
            "1M": [
              ...generatePerformanceFor1M(),
              {
                day: new Date(datetime).toISOString().split("T")[0],
                value: Number(lowPrice).toFixed(2),
              },
            ],
            "1Y": [
              ...generatePerformanceData("months", 6),
              {
                day: new Date(datetime).getFullYear(),
                value: Number(lowPrice).toFixed(2),
              },
            ],
            "3Y": [
              ...generatePerformanceData("years", 3),
              {
                day: new Date(datetime).getFullYear(),
                value: Number(lowPrice).toFixed(2),
              },
            ],
          },
          compareData: [
            { instrument: "AE38 USD 2038", yield: "7,5 %", risk: "Moderado" },
            { instrument: "GD30 USD 2030", yield: "8,1 %", risk: "Moderado" },
            { instrument: "AL30 USD 2030", yield: "7,3 %", risk: "Arriesgado" },
            {
              instrument: "Fondo XYZ Global",
              yield: "6,8 %",
              risk: "Conservador",
            },
          ],
        };

        setInstrument(transformedData);
      }
    } catch (error) {
      console.error("Error fetching instrument data:", error);
    }
  };

  if (!instrument) {
    return <></>;
  }

  if (instrument.error) {
    return (
      <div className="m-4 card card-bordered bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-12 h-12 text-red-500"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zm0 6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-500">
            Error: {instrument.error}
          </h3>
          <p className="text-gray-500 mt-2">
            Parece que esta información no está disponible.
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary text-white"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
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
            {type === "forex" && "Forex"}
            {type === "etfs" && "ETFs"}
            {type === "fund" && "Fondos"}
          </h1>
        </div>
        <h2 className="text-2xl font-semibold">{id}</h2>
      </div>

      <div className="flex flex-col container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 w-full">
          <h3 className="text-2xl font-bold">{instrument.name}</h3>
        </div>

        <div className="mb-6">
          <div className="text-primary text-4xl font-bold mb-2">
            {instrument.price || "Detalles Premium"}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{instrument.change || "N/A"}</span>
            <div
              className={`flex items-center ${
                instrument.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              <ArrowRight
                className={`w-4 h-4 ${
                  instrument.isPositive ? "" : "rotate-90"
                }`}
              />
              <span>{instrument.changePercent || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="lg:flex w-full lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <PerformanceChart performanceData={instrument.performance} />
          </div>
        </div>

        <CreateInvestmentModal instrument={instrument} />
      </div>
    </div>
  );
};
