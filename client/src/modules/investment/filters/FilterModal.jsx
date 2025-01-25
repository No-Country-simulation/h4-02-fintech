import { Setting4 } from "iconsax-react";
import useFilterStore from "../store/useFilterStore";
import { Link } from "react-router-dom";

export const FilterModal = () => {
  const { isModalOpen, setModalOpen, selectedFilters, setFilter } =
    useFilterStore();

  return (
    <div>
      <button className="flex btn btn-ghost" onClick={() => setModalOpen(true)}>
        <Setting4 size={24} /> Filtros
      </button>

      <dialog
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
        onClick={() => setModalOpen(false)}
      >
        <div
          className="modal-box relative bg-white max-w-md p-6 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-ghost absolute right-2 top-2 text-black"
            onClick={() => setModalOpen(false)}
          >
            ✕
          </button>

          <div className="p-4">
            {/* Filtrar por Instrumento */}
            <h3 className="text-md text-primary font-bold mb-4">
              Filtrar por Instrumento
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Acciones", "Bonos", "CDEARs", "Fondos"].map((instrument) => (
                <button
                  key={instrument}
                  className={`badge badge-neutral badge-lg cursor-pointer ${
                    selectedFilters.instrument === instrument
                      ? "badge-primary"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setFilter("instrument", instrument)}
                >
                  {instrument}
                </button>
              ))}
            </div>

            {/* Filtrar por nivel de riesgo */}
            <h3 className="text-md text-primary font-bold mb-4">
              Filtrar por nivel de riesgo
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Conservador", "Moderado", "Arriesgado"].map((risk) => (
                <button
                  key={risk}
                  className={`badge badge-neutral badge-lg cursor-pointer ${
                    selectedFilters.riskLevel === risk
                      ? "badge-primary"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setFilter("riskLevel", risk)}
                >
                  {risk}
                </button>
              ))}
            </div>

            {/* Filtrar por plazo */}
            <h3 className="text-md text-primary font-bold mb-4">
              Filtrar por plazo
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Corto plazo", "Mediano plazo", "Largo plazo"].map((term) => (
                <button
                  key={term}
                  className={`badge badge-neutral badge-lg cursor-pointer ${
                    selectedFilters.term === term
                      ? "badge-primary"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setFilter("term", term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              type="button"
              className="btn btn-primary w-full"
              onClick={() => setModalOpen(false)}
              to={"/dashboard/investment/filter"}
            >
              Aplicar Filtros
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
};
