import { useForm } from "react-hook-form";
import { ArrowLeft2 } from "iconsax-react";
import PropTypes from "prop-types";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { toast } from "sonner";
import { getErrorMessage } from "../../../validators/errorHandler";
import { updateOnboarding } from "../../services/onboarding";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const AboutYouPage = ({ nextStep, prevStep }) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useOnboardingStore();
  const { user } = useAuthStore();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experience:
        formData.knowledgeLevel === ""
          ? "principiante"
          : formData.knowledgeLevel,
    },
  });

  const experienceValue = watch("experience");

  const handleFormSubmit = (data) => {
    updateFormData({ knowledgeLevel: data.experience });
    nextStep();
  };

  const handleSaveAndContinueLater = async () => {
    try {
      const response = await updateOnboarding({
        knowledgeLevel: experienceValue,
        userId: user.id,
      });

      if (response) {
        updateFormData({ knowledgeLevel: experienceValue });
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
    <div>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-md w-full space-y-8">
          <div className="space-y-8">
            <button className="p-2 -ml-2" onClick={prevStep}>
              <ArrowLeft2 className="w-6 h-6" />
            </button>
            <div className="space-y-4 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold">
                Queremos conocerte mejor
              </h1>
              <h2 className="text-xl font-semibold">
                ¿Cuál es tu nivel de experiencia en finanzas?
              </h2>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    id="principiante"
                    value="principiante"
                    {...register("experience", {
                      required: "Selecciona una opción",
                    })}
                    className="radio radio-primary"
                    checked={experienceValue === "principiante"}
                  />
                  <label
                    htmlFor="principiante"
                    className="flex flex-col items-start cursor-pointer"
                  >
                    <span className="font-semibold">Principiante:</span>
                    <span className="text-gray-600">
                      {`"Conozco poco sobre ahorro e inversión."`}
                    </span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    id="intermedio"
                    value="intermedio"
                    {...register("experience", {
                      required: "Selecciona una opción",
                    })}
                    className="radio radio-primary"
                    checked={experienceValue === "intermedio"}
                  />
                  <label
                    htmlFor="intermedio"
                    className="flex flex-col items-start cursor-pointer"
                  >
                    <span className="font-semibold">Intermedio:</span>
                    <span className="text-gray-600">
                      {`"Tengo experiencia básica en opciones como plazos fijos o
                      dólares."`}
                    </span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    id="avanzado"
                    value="avanzado"
                    {...register("experience", {
                      required: "Selecciona una opción",
                    })}
                    className="radio radio-primary"
                    checked={experienceValue === "avanzado"}
                  />
                  <label
                    htmlFor="avanzado"
                    className="flex flex-col items-start cursor-pointer"
                  >
                    <span className="font-semibold">Avanzado:</span>
                    <span className="text-gray-600">
                      {`"Conozco y he usado instrumentos financieros más complejos."`}
                    </span>
                  </label>
                </div>

                {errors.experience && (
                  <p className="text-red-500 text-sm">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center items-center py-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                  ${
                    step === 1
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
    </div>
  );
};

AboutYouPage.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
