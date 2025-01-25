import {
  ArrowLeft,
  ArrowRight,
  DocumentFilter,
  SearchNormal,
} from "iconsax-react"; // Usamos FileSearch como ícono
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cedears = [
  {
    id: "GGAL",
    name: "Grupo Galicia",
    description: "Cedear de Grupo Galicia",
    value: "ARS 1,200.00",
    change: "2,10 %",
    isPositive: true,
    logo: "", // Logo de la empresa
  },
  {
    id: "BMA",
    name: "Banco Macro",
    description: "Cedear de Banco Macro",
    value: "ARS 1,000.50",
    change: "-0,50 %",
    isPositive: false,
    logo: "", // Logo de la empresa
  },
  {
    id: "YPF",
    name: "YPF S.A.",
    description: "Cedear de YPF",
    value: "ARS 700.00",
    change: "1,30%",
    isPositive: true,
    logo: "", // Logo de la empresa
  },
  {
    id: "PAMP",
    name: "Pampa Energía",
    description: "Cedear de Pampa Energía",
    value: "ARS 550.00",
    change: "-0,30%",
    isPositive: false,
    logo: "", // Logo de la empresa
  },
  {
    id: "AUSO",
    name: "Autopistas del Sol",
    description: "Cedear de Autopistas del Sol",
    value: "ARS 300.00",
    change: "0,50%",
    isPositive: true,
    logo: "", // Logo de la empresa
  },
];

export const CedearsPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCedears = cedears.filter((cedear) =>
    cedear.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-base font-semibold mb-4">Cedears</h2>

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

      {/* Lista de cedears */}
      <div className="bg-gray-50 min-h-screen pt-4">
        {filteredCedears.length > 0 ? (
          filteredCedears.map((cedear) => (
            <div key={cedear.id}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() =>
                  navigate(
                    `/dashboard/investment/instrument/cedear/${cedear.id}`
                  )
                }
              >
                <div className="flex items-center gap-3">
                  {cedear.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={cedear.logo}
                        alt="Company logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <DocumentFilter className="w-5 h-5 text-blue-500" />
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-lg">{cedear.name}</h3>
                    <p className="text-gray-500">{cedear.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{cedear.value}</p>
                  <div className="flex items-center justify-end gap-1">
                    {cedear.isPositive === true ? (
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    ) : cedear.isPositive === false ? (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`${
                        cedear.isPositive === true ? "text-green-500" : ""
                      } ${cedear.isPositive === false ? "text-red-500" : ""} ${
                        cedear.isPositive === null ? "text-gray-400" : ""
                      }`}
                    >
                      {cedear.change}
                    </span>
                  </div>
                </div>
              </button>
              <div className="divider my-0 mx-4"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron cedears.
          </p>
        )}
      </div>
    </div>
  );
};
