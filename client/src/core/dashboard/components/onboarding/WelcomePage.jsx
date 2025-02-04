import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { validateComplete } from "../../../validators/complete";
import iupiFooterImage from "../../../../assets/images/iupi-footer.svg";
import sloganFooterImage from "../../../../assets/images/slogan-footer.svg";

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
    <div className="min-h-screen bg-gradient-to-b from-primary to-[#001E47] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-md w-full space-y-8">
        <div className="space-y-8 text-center">
          <div className="flex justify-center items-center gap-4 flex-col">
            <img
              src={iupiFooterImage}
              alt="iupi-desktop"
              className="w-24 sm:w-32 md:w-40 lg:w-48 max-w-full"
            />
            <img
              src={sloganFooterImage}
              alt="slogan-desktop"
              className="w-32 sm:w-40 md:w-48 lg:w-56 max-w-full"
            />
          </div>

          <h1 className="text-2xl text-white md:text-3xl font-semibold px-4">
            Bienvenido a iUpi: tu aliado en el ahorro e inversión.
          </h1>

          <p className="text-lg text-white font-semibold px-4">
            En unos simples pasos crearemos un perfil financiero adaptado a tus
            necesidades. ¡Comencemos!
          </p>

          <div className="space-y-4 pt-4">
            <button className="w-full btn btn-outline btn-primary bg-white" onClick={nextStep}>
              Iniciar
            </button>

            <Link
              className="w-full btn btn-primary"
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
