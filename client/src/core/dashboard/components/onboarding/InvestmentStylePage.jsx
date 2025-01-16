import { ArrowLeft2 } from "iconsax-react";
import PropTypes from "prop-types";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import { updateOnboarding } from "../../services/onboarding";
import { toast } from "sonner";
import { getErrorMessage } from "../../../validators/errorHandler";
import { useNavigate } from "react-router-dom";

export const InvestmentStylePage = ({ nextStep, prevStep }) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useOnboardingStore();
  const { riskPreference } = formData;
  const { user } = useAuthStore();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      investmentStyle: riskPreference === "" ? "bajo" : riskPreference,
    },
  });

  const investmentStyle = watch("investmentStyle");

  const handleFormSubmit = (data) => {
    updateFormData({ riskPreference: data.investmentStyle });
    nextStep();
  };

  const handleSaveAndContinueLater = async () => {
    try {
      const response = await updateOnboarding({
        knowledgeLevel: formData.knowledgeLevel,
        goals: formData.goals,
        riskPreference: investmentStyle,
        userId: user.id,
      });

      if (response) {
        updateFormData({ riskPreference: investmentStyle });
        toast("Onboarding actualizado", {
          description: "Se ha actualizado el onboarding",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("No se pudo actualizar el onboarding", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-md w-full space-y-8">
        <button className="p-2 -ml-2" onClick={prevStep}>
          <ArrowLeft2 className="w-6 h-6" />
        </button>

        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Tu estilo de inversión
            </h1>
            <h2 className="text-xl font-semibold">
              ¿Qué nivel de riesgo estás dispuesto a asumir al invertir?
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="bajo"
                  value="bajo"
                  {...register("investmentStyle", {
                    required: "Selecciona una opción",
                  })}
                  className="radio radio-primary"
                  checked={investmentStyle === "bajo"}
                />
                <label
                  htmlFor="conservador"
                  className="flex flex-col items-start cursor-pointer"
                >
                  <span className="font-semibold">Conservador:</span>
                  <span className="text-gray-600">
                    {`"Prefiero opciones seguras con retornos estables."`}
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="moderado"
                  value="moderado"
                  {...register("investmentStyle", {
                    required: "Selecciona una opción",
                  })}
                  className="radio radio-primary"
                  checked={investmentStyle === "moderado"}
                />
                <label
                  htmlFor="moderado"
                  className="flex flex-col items-start cursor-pointer"
                >
                  <span className="font-semibold">Moderado:</span>
                  <span className="text-gray-600">
                    {`"Estoy dispuesto a aceptar algo de riesgo por mayores
                    rendimientos."`}
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="alto"
                  value="alto"
                  {...register("investmentStyle", {
                    required: "Selecciona una opción",
                  })}
                  className="radio radio-primary"
                  checked={investmentStyle === "alto"}
                />
                <label
                  htmlFor="arriesgado"
                  className="flex flex-col items-start cursor-pointer"
                >
                  <span className="font-semibold">Arriesgado:</span>
                  <span className="text-gray-600">
                    {`"Estoy cómodo con altos riesgos para buscar mayores
                    retornos."`}
                  </span>
                </label>
              </div>

              {errors.investmentStyle && (
                <p className="text-red-500 text-sm">
                  {errors.investmentStyle.message}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center py-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                    ${
                      step === 3
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className="w-8 h-0.5 bg-gray-300" />}
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <button type="submit" className="w-full btn btn-primary">
                Siguiente
              </button>

              <button
                type="button"
                className="w-full btn btn-outline"
                onClick={handleSaveAndContinueLater}
              >
                Guardar y continuar en otro momento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

InvestmentStylePage.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
