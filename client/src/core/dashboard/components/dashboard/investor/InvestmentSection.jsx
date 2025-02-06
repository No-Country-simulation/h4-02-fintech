import { MoneyRecive } from "iconsax-react";
import { Link } from "react-router-dom";
import { useOnboardingStore } from "../../../../auth/store/useOnboardingStore";
import { validateComplete } from "../../../../validators/complete";

export const InvestmentSection = () => {
  const { formData } = useOnboardingStore();
  const formDataComplete = validateComplete(formData);
  return (
    formDataComplete && (
      <div className="sm:border-2 p-4 sm:rounded-xl sm:flex sm:flex-col sm:justify-center sm:items-center w-full">
        <div className="flex items-center gap-2">
          <MoneyRecive size="24" className="text-primary" />
          <h3 className="text-xl font-medium text-primary">
            Inversiones recomendadas
          </h3>
        </div>

        <div className="flex flex-col bg-base-100 border-2 rounded-xl p-6 shadow-sm space-y-4 w-full">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-sm text-gray-600">Nivel de riesgo</p>
              </div>
              <p className="text-sm text-gray-400 ml-4 capitalize">
                {formData.riskPreference}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-sm text-gray-600">Nivel de conocimiento</p>
              </div>
              <p className="text-sm text-gray-400 ml-4 capitalize">
                {formData.knowledgeLevel}
              </p>
            </div>

            <Link
              to="/dashboard/investment/recommendation"
              className="btn btn-primary w-full"
            >
              Explorar más detalles
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
