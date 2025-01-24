import { ArrowLeft, ArrowRight, SearchNormal, Briefcase } from "iconsax-react"; // Usamos el ícono Briefcase para representar las acciones
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const actions = [
  {
    id: "MELI",
    name: "Mercado Libre",
    description: "Acción de Mercado Libre",
    value: "ARS 12,300.50",
    change: "1,20 %",
    isPositive: true,
    logo: "",
  },
  {
    id: "YPF",
    name: "YPF",
    description: "Acción de YPF",
    value: "ARS 4,700.30",
    change: "-0,50 %",
    isPositive: false,
    logo: "",
  },
  {
    id: "GGAL",
    name: "Banco Galicia",
    description: "Acción de Banco Galicia",
    value: "ARS 375.10",
    change: "0,75%",
    isPositive: true,
    logo: "",
  },
  {
    id: "BBAR",
    name: "BBVA Argentina",
    description: "Acción de BBVA Argentina",
    value: "ARS 420.50",
    change: "-0,10%",
    isPositive: false,
    logo: "",
  },
  {
    id: "LOMA",
    name: "Loma Negra",
    description: "Acción de Loma Negra",
    value: "ARS 2,150.60",
    change: "2,00%",
    isPositive: true,
    logo: "",
  },
];

export const ActionsPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredActions = actions.filter((action) =>
    action.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-base font-semibold mb-4">Acciones</h2>

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
      </div>

      {/* Lista de acciones */}
      <div className="bg-white rounded-t-3xl min-h-screen">
        {filteredActions.length > 0 ? (
          filteredActions.map((action) => (
            <div
              key={action.id}
              className="border-b p-4 hover:shadow-lg"
              onClick={() =>
                navigate(`/dashboard/investment/instrument/action/${action.id}`)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {action.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={action.logo}
                        alt="Company logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-500" />{" "}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{action.name}</h3>
                    <p className="text-gray-500">{action.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{action.value}</p>
                  <div className="flex items-center justify-end gap-1">
                    {action.isPositive === true ? (
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    ) : action.isPositive === false ? (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`${
                        action.isPositive === true ? "text-green-500" : ""
                      } ${action.isPositive === false ? "text-red-500" : ""} ${
                        action.isPositive === null ? "text-gray-400" : ""
                      }`}
                    >
                      {action.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron acciones.
          </p>
        )}
      </div>
    </div>
  );
};
