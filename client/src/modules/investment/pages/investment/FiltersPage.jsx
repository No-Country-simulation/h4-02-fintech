import { ArrowLeft, ArrowRight, SearchNormal, Coin } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFilterStore from "../../store/useFilterStore";

const instruments = [
  {
    id: "AE38",
    name: "AE38",
    description: "Bono USD 2038",
    value: "ARS 844.80",
    change: "0,15 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Bono",
  },
  {
    id: "AE38C",
    name: "AE38C",
    description: "Bono USD 2038",
    value: "USD 0,715",
    change: "0,37 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Bono",
  },
  {
    id: "AP45",
    name: "AP45",
    description: "Bono USD 2045",
    value: "USD 150.50",
    change: "-0,25 %",
    isPositive: false,
    logo: "",
    term: "Mediano",
    risk: "Medio",
    type: "Bono",
  },
  {
    id: "XA28",
    name: "XA28",
    description: "Acción Tech Corp",
    value: "USD 350.10",
    change: "1,50 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "YP12",
    name: "YP12",
    description: "Acción Finanza Global",
    value: "USD 120.45",
    change: "-0,90 %",
    isPositive: false,
    logo: "",
    term: "Corto",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "MD10",
    name: "MD10",
    description: "Fondo de Inversión Global",
    value: "USD 1000.00",
    change: "0,05 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Alto",
    type: "Fondo",
  },
  {
    id: "DE30",
    name: "DE30",
    description: "CEDEAR Banco Nación",
    value: "ARS 780.30",
    change: "0,10 %",
    isPositive: true,
    logo: "",
    term: "Corto",
    risk: "Alto",
    type: "Cdear",
  },
  {
    id: "PG54",
    name: "PG54",
    description: "Fondo Crecimiento Acelerado",
    value: "USD 450.75",
    change: "-0,15 %",
    isPositive: false,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Fondo",
  },
  {
    id: "ZT28",
    name: "ZT28",
    description: "Acción Energía Argentina",
    value: "ARS 95.20",
    change: "0,90 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "GH41",
    name: "GH41",
    description: "Bono USD 2041",
    value: "USD 220.80",
    change: "0,25 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Bono",
  },
  {
    id: "CX33",
    name: "CX33",
    description: "Bono USD 2033",
    value: "ARS 620.40",
    change: "0,05 %",
    isPositive: true,
    logo: "",
    term: "Corto",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "LD52",
    name: "LD52",
    description: "CEDEAR YPF",
    value: "USD 500.10",
    change: "-0,10 %",
    isPositive: false,
    logo: "",
    term: "Corto",
    risk: "Bajo",
    type: "Accion",
  },
  {
    id: "PL73",
    name: "PL73",
    description: "Bono USD 2033",
    value: "USD 180.60",
    change: "0,90 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Bono",
  },
  {
    id: "FB11",
    name: "FB11",
    description: "Acción FinTech Argentina",
    value: "USD 110.40",
    change: "2,20 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Moderado",
    type: "Accion",
  },
  {
    id: "EF55",
    name: "EF55",
    description: "Fondo Inversiones Sostenibles",
    value: "USD 550.60",
    change: "-0,60 %",
    isPositive: false,
    logo: "",
    term: "Largo",
    risk: "Alto",
    type: "Fondo",
  },
  {
    id: "MR19",
    name: "MR19",
    description: "Acción Mercado Libre",
    value: "USD 840.25",
    change: "1,10 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Bajo",
    type: "Accion",
  },
  {
    id: "CX56",
    name: "CX56",
    description: "Fondo Diversificación Global",
    value: "USD 320.45",
    change: "-0,30 %",
    isPositive: false,
    logo: "",
    term: "Corto",
    risk: "Moderado",
    type: "Fondo",
  },
  {
    id: "AS28",
    name: "AS28",
    description: "Acción AgroGlobal",
    value: "USD 200.90",
    change: "3,10 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "AP36",
    name: "AP36",
    description: "Bono USD 2036",
    value: "USD 180.70",
    change: "0,75 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Medio",
    type: "Bono",
  },
  {
    id: "PA48",
    name: "PA48",
    description: "Acción Latinoamericana Global",
    value: "USD 500.10",
    change: "1,30 %",
    isPositive: true,
    logo: "",
    term: "Mediano",
    risk: "Alto",
    type: "Accion",
  },
  {
    id: "TA23",
    name: "TA23",
    description: "Fondo Inversión Multinacional",
    value: "USD 1000.00",
    change: "0,50 %",
    isPositive: true,
    logo: "",
    term: "Largo",
    risk: "Bajo",
    type: "Fondo",
  },
  {
    id: "XH50",
    name: "XH50",
    description: "CEDEAR Telecom Argentina",
    value: "USD 160.00",
    change: "0,80 %",
    isPositive: true,
    logo: "",
    term: "Corto",
    risk: "Alto",
    type: "Cdear",
  },
];

export const FiltersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Usamos el store de Zustand para obtener los filtros seleccionados
  const { selectedFilters } = useFilterStore();

  // Mapeo de filtros recibidos
  const type = selectedFilters?.instrument || ""; //"Acciones", "Bonos", "CDEARs", "Fondos"
  const risk = selectedFilters?.riskLevel || ""; // "Conservador", "Moderado", "Arriesgado"
  const term = selectedFilters?.term || ""; //"Corto plazo", "Mediano plazo", "Largo plazo"

  // Mapeo para hacer la correspondencia con los filtros
  const termMapping = {
    "Corto plazo": "Corto", // Filtro -> Data
    "Mediano plazo": "Mediano",
    "Largo plazo": "Largo",
  };

  const riskMapping = {
    Conservador: "Bajo", // Filtro -> Data
    Moderado: "Medio",
    Arriesgado: "Alto",
  };

  const typeMapping = {
    Acciones: "Accion", // Filtro -> Data
    Bonos: "Bono",
    CEDEARs: "Cdear",
    Fondos: "Fondo",
  };

  // Filtramos los instrumentos según los filtros seleccionados
  const filteredInstruments = instruments.filter((instrument) => {
    const matchesSearchTerm = instrument.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType = type
      ? instrument.type.toLowerCase() ===
        (typeMapping[type] || "").toLowerCase()
      : true;

    const matchesTerm = term
      ? instrument.term === (termMapping[term] || "")
      : true;
    const matchesRisk = risk
      ? instrument.risk === (riskMapping[risk] || "")
      : true;

    return matchesSearchTerm && matchesType && matchesTerm && matchesRisk;
  });

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
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
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
        {filteredInstruments.length > 0 ? (
          filteredInstruments.map((instrument) => (
            <div key={instrument.id}>
              <button
                className="btn btn-ghost w-full flex items-center justify-between"
                onClick={() =>
                  navigate(
                    `/dashboard/investment/instrument/bond/${instrument.id}`
                  )
                }
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
                    <h3 className="font-bold text-lg">{instrument.name}</h3>
                    <p className="text-gray-500">{instrument.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{instrument.value}</p>
                  <div className="flex items-center justify-end gap-1">
                    {instrument.isPositive === true ? (
                      <ArrowRight className="w-4 h-4 text-green-500" />
                    ) : instrument.isPositive === false ? (
                      <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`${
                        instrument.isPositive === true ? "text-green-500" : ""
                      } ${
                        instrument.isPositive === false ? "text-red-500" : ""
                      } ${
                        instrument.isPositive === null ? "text-gray-400" : ""
                      }`}
                    >
                      {instrument.change}
                    </span>
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
