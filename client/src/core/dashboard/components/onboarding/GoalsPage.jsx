import { useForm } from "react-hook-form";
import { ArrowLeft2 } from "iconsax-react";
import PropTypes from "prop-types";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import { updateOnboarding } from "../../services/onboarding";
import { toast } from "sonner";
import { getErrorMessage } from "../../../validators/errorHandler";
import { useNavigate } from "react-router-dom";

export const GoalsPage = ({ nextStep, prevStep }) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useOnboardingStore();
  const { goals: selectedGoals } = formData;
  const { user } = useAuthStore();

  const {
    handleSubmit,
    setError,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goals: selectedGoals.length > 0 ? selectedGoals : ["vacaciones"],
    },
  });

  const watchGoals = watch("goals");

  const goals = [
    { id: "vacaciones", label: "Planificar unas vacaciones." },
    { id: "bienes", label: "Comprar bienes." },
    { id: "retiro", label: "Planificar mi retiro." },
    { id: "proyecto", label: "Financiar un proyecto a largo plazo." },
  ];

  const handleGoalChange = (goalId) => {
    clearErrors("goals");

    const updatedGoals = watchGoals.includes(goalId)
      ? watchGoals.filter((id) => id !== goalId)
      : [...watchGoals, goalId];

    updateFormData({ goals: updatedGoals });

    setValue("goals", updatedGoals);
  };

  const handleFormSubmit = () => {
    if (watchGoals.length === 0) {
      setError("goals", {
        type: "manual",
        message: "Selecciona al menos una meta.",
      });
      return;
    }
    updateFormData({ goals: watchGoals });
    nextStep();
  };

  const handleSaveAndContinueLater = async () => {
    try {
      if (watchGoals.length === 0) {
        setError("goals", {
          type: "manual",
          message: "Selecciona al menos una meta.",
        });
        return;
      }
      const response = await updateOnboarding({
        knowledgeLevel: formData.knowledgeLevel,
        goals: watchGoals,
        userId: user.id,
      });

      if (response) {
        updateFormData({ goals: watchGoals });
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
            <h1 className="text-2xl text-primary md:text-3xl font-semibold">
              ¿Qué quieres lograr?
            </h1>
            <h2 className="text-xl">
              Selecciona tus principales metas financieras:
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    id={goal.id}
                    className="checkbox checkbox-primary"
                    checked={watchGoals?.includes(goal.id) || false}
                    onChange={() => handleGoalChange(goal.id)}
                  />
                  <label htmlFor={goal.id} className="cursor-pointer">
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>

            {errors.goals && (
              <p className="text-red-500 text-sm">{errors.goals.message}</p>
            )}

            <div className="flex justify-center items-center py-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                      ${
                        step === 2
                          ? "border-secondary bg-secondary text-white"
                          : step === 1
                          ? "border-secondary bg-white text-secondary"
                          : "border-gray-300 text-gray-300"
                      }`}
                  >
                    {step === 1 ? "✓" : step}
                  </div>
                  {step < 4 && <div className="w-8 h-0.5 bg-gray-300"></div>}
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={!!errors.goals || watchGoals.length === 0}
              >
                Siguiente
              </button>

              <button
                type="button"
                className="w-full btn btn-outline"
                disabled={!!errors.goals || watchGoals.length === 0}
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

GoalsPage.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
