import { ArrowLeft, /* ArrowRight, */ SearchNormal, Coin } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFilterStore from "../../store/useFilterStore";
import { getByInstrument } from "../../services/instrument";
import { getErrorMessage } from "../../../../core/validators/errorHandler";
import { toast } from "sonner";

export const FiltersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const filteredInstruments = instruments.filter((instrument) =>
    instrument.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usamos el store de Zustand para obtener los filtros seleccionados
  const { selectedFilters } = useFilterStore();

  const type = selectedFilters?.instrument || ""; // "Acciones", "Bonos", "CDEARs", "Fondos"
  const risk = selectedFilters?.riskLevel || ""; // "Conservador", "Moderado", "Arriesgado"
  const term = selectedFilters?.term || ""; // "Corto plazo", "Mediano plazo", "Largo plazo"

  const getInstruments = async () => {
    try {
      const instruments = await getByInstrument(type);
      setInstruments(instruments);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    getInstruments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-primary px-4 py-2 text-white">
        <div className="flex items-center gap-4 mb-4">
          <button
            className="btn btn-ghost btn-square p-2"
            onClick={() => navigate("/dashboard/investment")}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold">Mercado Argentino</h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="input input-bordered w-full bg-white text-black pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchNormal className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Mostrar filtros seleccionados */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-white">{`Tipo: ${
            type || "No seleccionado"
          }`}</span>
          <span className="text-white">{`Riesgo: ${
            risk || "No seleccionado"
          }`}</span>
          <span className="text-white">{`Plazo: ${
            term || "No seleccionado"
          }`}</span>
        </div>
      </div>

      {/* Lista de instrumentos filtrados */}
      <div className="bg-gray-50 min-h-screen pt-4">
        {loading ? (
          // Skeleton loader
          <div className="p-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col w-full">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredInstruments.length > 0 ? (
          filteredInstruments.map((instrument) => (
            <div key={instrument.symbol}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() => {
                  let typePath = "";
                  switch (type) {
                    case "BOND":
                      typePath = "bonds";
                      break;
                    case "FOREX":
                      typePath = "FOREX";
                      break;
                    case "ETFS":
                      typePath = "etfs";
                      break;
                    case "COMMODITIES":
                      typePath = "commodities";
                      break;
                    default:
                      typePath = "";
                  }

                  navigate(
                    `/dashboard/investment/instrument/${typePath}/${instrument.symbol}`
                  );
                }}
              >
                <div className="flex items-center gap-3">
                  {instrument.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={instrument.logo}
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
                    <h3 className="font-bold text-lg">{instrument.symbol}</h3>
                    <p className="text-gray-500">{`${type} ${instrument.symbol}`}</p>
                  </div>
                </div>
              </button>
              <div className="divider my-0 mx-4"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron instrumentos.
          </p>
        )}
      </div>
    </div>
  );
};
