import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../../core/dashboard/components/dashboard/investor/Navbar";
import { useOnboardingStore } from "../../../core/auth/store/useOnboardingStore";
import { validateComplete } from "../../../core/validators/complete";
import recommendationModalImage from "../../../assets/images/recommendation-modal.svg";

export const InvestmentLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formData } = useOnboardingStore();
  const formDataComplete = validateComplete(formData);

  const handleRecommendationClick = (e) => {
    if (!formDataComplete) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar title="Gestión de inversiones" />
      <div className="container mx-auto p-4">
        <div role="tablist" className="tabs tabs-bordered mb-4">
          {/* Pestaña "Explorar" */}
          <NavLink
            to="/dashboard/investment"
            end
            role="tab"
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Explorar
          </NavLink>

          {/* Pestaña "Recomendaciones" con lógica de modal */}
          <NavLink
            to={
              formDataComplete
                ? "/dashboard/investment/recommendation"
                : "/dashboard/investment/recommendation"
            }
            role="tab"
            onClick={handleRecommendationClick}
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Recomendaciones
          </NavLink>
        </div>

        <div className="p-4">
          <Outlet />
        </div>

        {/* Modal */}
        {isOpen && (
          <dialog className="modal modal-open" onClick={() => setIsOpen(false)}>
            <div
              className="modal-box relative bg-white max-w-md p-6 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn-sm btn-ghost absolute right-2 top-2 text-black"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <div className="flex justify-center py-6">
                <img
                  src={recommendationModalImage}
                  alt="Recommendation modal illustration"
                  width="130"
                  height="120"
                  className="object-cover"
                />
              </div>

              <div className="mb-6 text-xl text-semibold">
                <p className="text-bold text-2xl text-center text-primary">
                  ¡Ups! Aún faltan algunos datos
                </p>
                <p className="text-center text-secondary mt-2">
                  {`Completa tu perfil para que podamos mostrarte recomendaciones personalizadas.
                  ¡Es súper rápido y te ayudará a sacarle el máximo provecho a Iupi!`}
                </p>
              </div>

              <div className="space-y-2 mb-2">
                <Link
                  to={"/dashboard/onboarding"}
                  className="btn btn-primary w-full"
                >
                  Completar perfil
                </Link>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};
