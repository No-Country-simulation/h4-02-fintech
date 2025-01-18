import PropTypes from "prop-types";
import onboardingImage from "../../../../assets/images/onboarding.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { validateComplete } from "../../../validators/complete";

export const WelcomePage = ({ nextStep }) => {
  const { updateFormData, formData, setStep } = useOnboardingStore();

  const handleSaveAndContinueLater = () => {
    updateFormData({ knowledgeLevel: "" });
  };

  useEffect(() => {
    const formDataComplete = validateComplete(formData);
    if (formDataComplete) {
      setStep(6);
    }
  }, [formData, setStep]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-md w-full space-y-8">
        <div className="space-y-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold px-4">
            Bienvenido a iUpi: tu aliado en el ahorro e inversión.
          </h1>

          <div className="flex justify-center">
            <img src={onboardingImage} alt="onboarding-image" />
          </div>

          <p className="text-lg font-semibold px-4">
            En unos simples pasos crearemos un perfil financiero adaptado a tus
            necesidades. ¡Comencemos!
          </p>

          <div className="space-y-4 pt-4">
            <button className="w-full btn btn-primary" onClick={nextStep}>
              Iniciar
            </button>

            <Link
              className="w-full btn btn-outline"
              to="/dashboard"
              onClick={handleSaveAndContinueLater}
            >
              Realizar más tarde
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

WelcomePage.propTypes = {
  nextStep: PropTypes.func.isRequired,
};
