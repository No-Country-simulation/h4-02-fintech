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

export const EtfsPage = () => {
  const navigate = useNavigate();
  const [etfs, setEtfs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEtfs = etfs.filter((etf) =>
    etf.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEtfs = async () => {
    try {
      const etfs = await getByInstrument("ETFS");

      setEtfs(etfs);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    }
  };

  useEffect(() => {
    getEtfs();
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
        <h2 className="text-base font-semibold mb-4">Bonos</h2>

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

      {/* Lista de bonos */}
      <div className="bg-gray-50 min-h-screen pt-4">
        {filteredEtfs.length > 0 ? (
          filteredEtfs.map((etf) => (
            <div key={etf.symbol}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() =>
                  navigate(
                    `/dashboard/investment/instrument/etfs/${etf.symbol}`
                  )
                }
              >
                <div className="flex items-center gap-3">
                  {etf.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={etf.logo}
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
                    <h3 className="font-bold text-lg">{etf.symbol}</h3>
                    <p className="text-gray-500">{`ETF ${etf.symbol}`}</p>
                  </div>
                </div>
                {/* <div className="text-right">
                  <p className="font-semibold">{bond.value}</p>
                  <div className="flex items-center justify-end gap-1">
                    {bond.isPositive === true ? (
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    ) : bond.isPositive === false ? (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`${
                        bond.isPositive === true ? "text-green-500" : ""
                      } ${bond.isPositive === false ? "text-red-500" : ""} ${
                        bond.isPositive === null ? "text-gray-400" : ""
                      }`}
                    >
                      {bond.change}
                    </span>
                  </div>
                </div> */}
              </button>
              <div className="divider my-0 mx-4"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron ETFs.
          </p>
        )}
      </div>
    </div>
  );
};
