import {
  ArrowLeft,
  /*  ArrowRight, */ SearchNormal,
  Coin,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getByInstrument } from "../../services/instrument";
import { getErrorMessage } from "../../../../core/validators/errorHandler";
import { toast } from "sonner";

export const ForexPage = () => {
  const navigate = useNavigate();
  const [forex, setForex] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [searchTerm, setSearchTerm] = useState("");

  const filteredForex = forex.filter((forex) =>
    forex.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getForex = async () => {
    try {
      const forexList = await getByInstrument("FOREX");
      setForex(forexList);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    getForex();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-primary px-4 py-2 text-white">
        <div className="flex items-center gap-4 mb-4">
          <button
            className="btn btn-ghost btn-square p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold">Mercado Argentino</h1>
        </div>
        <h2 className="text-base font-semibold mb-4">Forex</h2>

        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="input input-bordered w-full bg-white text-black pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          />
          <SearchNormal className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Lista de Forex */}
      <div className="bg-gray-50 min-h-screen pt-4">
        {loading ? (
          // Skeleton loader
          <div className="p-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col w-full">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredForex.length > 0 ? (
          filteredForex.map((forex_item) => (
            <div key={forex_item.symbol}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() =>
                  navigate(
                    `/dashboard/investment/instrument/forex/${forex_item.symbol.replace(
                      /\//g,
                      "-"
                    )}`
                  )
                }
              >
                <div className="flex items-center gap-3">
                  {forex_item.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={forex_item.logo}
                        alt="Company logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Coin className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-lg">{forex_item.symbol}</h3>
                    <p className="text-gray-500">{`FOREX ${forex_item.symbol}`}</p>
                  </div>
                </div>
              </button>
              <div className="divider my-0 mx-4"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron Forex.
          </p>
        )}
      </div>
    </div>
  );
};
