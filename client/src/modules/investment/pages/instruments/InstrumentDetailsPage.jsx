import { ArrowLeft, ArrowRight, Danger } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { PerformanceChart } from "../../../../core/dashboard/components/dashboard/ui/PerformanceChart";
import { useEffect, useState } from "react";
import { getPrice } from "../../services/instrument";
import CreateInvestmentModal from "../../components/CreateInvestmentModal";
import { convertUsdToArs } from "../../../../core/services/exchange";


export const InstrumentDetailsPage = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [instrument, setInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceInArs, setPriceInArs] = useState(null); // Estado para el precio en ARS

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
      const priceData = await getPrice(
        id.replace(/-/g, "/")
      );

      if (priceData?.message?.includes("plan")) {
        setInstrument({ error: "Detalles Premium" });
      } else if (
        priceData?.message?.includes("missing or invalid") ||
        priceData?.message?.includes("No data")
      ) {
        setInstrument({ error: "No se encontraron datos" });
      } else {
        const graphHighPrice = priceData.values[0]?.high + 50;
        const graphLowPrice = priceData.values[0]?.low - 50;
        const highPrice = priceData.values[0]?.open;
        const lowPrice = priceData.values[0]?.close;
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
          PriceSummary: [
            {
              label: "Precio de apertura",
              value: `$${highPrice}`,
              arsValue: `ARS ${await convertUsdToArs(highPrice)}`, // Agregar precio en ARS
            },
            {
              label: "Precio de cierre",
              value: `$${lowPrice}`,
              arsValue: `ARS ${await convertUsdToArs(lowPrice)}`, // Agregar precio en ARS
            },
            {
              label: "Precio más alto",
              value: `$${graphHighPrice}`,
              arsValue: `ARS ${await convertUsdToArs(graphHighPrice)}`, // Agregar precio en ARS
            },
            {
              label: "Precio más bajo",
              value: `$${graphLowPrice}`,
              arsValue: `ARS ${await convertUsdToArs(graphLowPrice)}`, // Agregar precio en ARS
            },
          ],
        };

        setInstrument(transformedData);

        // Convertir el precio a ARS
        const arsPrice = await convertUsdToArs(lowPrice);
        setPriceInArs(arsPrice);
      }
    } catch (error) {
      console.error("Error fetching instrument data:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-72 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }

  if (instrument.error) {
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
          </div>
        </div>

        <div className="m-4 card card-bordered bg-base-200 shadow-xl">
          <div className="card-body text-center">
            <div className="flex justify-center mb-4">
              <Danger size={32} className="text-red-500" />
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
          <div className="text-secondary text-2xl font-bold mb-2">
            {priceInArs ? `ARS ${priceInArs}` : "..."}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{instrument.change || "N/A"}</span>
            <div
              className={`flex items-center ${instrument.isPositive ? "text-green-500" : "text-red-500"
                }`}
            >
              <ArrowRight
                className={`w-4 h-4 ${instrument.isPositive ? "" : "rotate-90"
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

          <div className="w-full lg:w-1/2">
            <h2 className="font-semibold text-primary text-md">Caja de puntas</h2>
            <table className="table w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Descripción</th>
                  <th>Valor (USD)</th>
                  <th>Valor (ARS)</th>
                </tr>
              </thead>
              <tbody>
                {instrument.PriceSummary.map((item, index) => (
                  <tr key={index}>
                    <td>{item.label}</td>
                    <td>{item.value}</td>
                    <td>{item.arsValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <CreateInvestmentModal instrument={{ ...instrument, price: priceInArs }} />
      </div>
    </div>
  );
};