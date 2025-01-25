import { ArrowLeft, ArrowRight, SearchNormal, Wallet } from "iconsax-react"; // Usamos Wallet como ícono para fondos
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const fondos = [
  {
    id: "FGB1",
    name: "Fondo Galicia 1",
    description: "Fondo de Inversión de Grupo Galicia",
    value: "ARS 5,500.00",
    change: "3,00 %",
    isPositive: true,
    logo: "",
  },
  {
    id: "FMB1",
    name: "Fondo Macro 1",
    description: "Fondo de Inversión de Banco Macro",
    value: "ARS 4,200.00",
    change: "-1,50 %",
    isPositive: false,
    logo: "",
  },
  {
    id: "FYM1",
    name: "Fondo YPF Mixto",
    description: "Fondo de Inversión Mixto de YPF",
    value: "ARS 3,800.00",
    change: "1,80%",
    isPositive: true,
    logo: "",
  },
  {
    id: "FPE1",
    name: "Fondo Pampa Energía 1",
    description: "Fondo de Inversión Pampa Energía",
    value: "ARS 2,900.00",
    change: "-0,70%",
    isPositive: false,
    logo: "",
  },
  {
    id: "FADS",
    name: "Fondo Ahorro Dólar Solidario",
    description: "Fondo de Inversión Dólar Solidario",
    value: "ARS 6,100.00",
    change: "0,90%",
    isPositive: true,
    logo: "",
  },
];

export const FundsPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredFondos = fondos.filter((fondo) =>
    fondo.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-base font-semibold mb-4">Fondos</h2>

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

      {/* Lista de fondos */}
      <div className="bg-gray-50 min-h-screen pt-4">
        {filteredFondos.length > 0 ? (
          filteredFondos.map((fund) => (
            <div key={fund.id}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() =>
                  navigate(`/dashboard/investment/instrument/bond/${fund.id}`)
                }
              >
                <div className="flex items-center gap-3">
                  {fund.logo ? (
                    <div className="w-8 h-8">
                      <img
                        src={fund.logo}
                        alt="Fondo logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-blue-500" />{" "}
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold text-lg">{fund.name}</h3>
                    <p className="text-gray-500">{fund.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{fund.value}</p>
                  <div className="flex items-center justify-end gap-1">
                    {fund.isPositive === true ? (
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    ) : fund.isPositive === false ? (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`${
                        fund.isPositive === true ? "text-green-500" : ""
                      } ${fund.isPositive === false ? "text-red-500" : ""} ${
                        fund.isPositive === null ? "text-gray-400" : ""
                      }`}
                    >
                      {fund.change}
                    </span>
                  </div>
                </div>
              </button>
              <div className="divider my-0 mx-4"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center p-4">
            No se encontraron fondos.
          </p>
        )}
      </div>
    </div>
  );
};
