import { ArrowLeft2 } from "iconsax-react";
import { useForm } from "react-hook-form";
import { formatCurrency } from "../../../utils/formatCurrency";
import PropTypes from "prop-types";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { updateOnboarding } from "../../services/onboarding";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../validators/errorHandler";

export const CurrentNumbersPage = ({ nextStep, prevStep }) => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useOnboardingStore();
  const { monthlyIncome, monthlyExpenses, savingsPercentage } = formData;
  const { user } = useAuthStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      monthlyIncome: monthlyIncome,
      monthlyExpenses: monthlyExpenses,
      savingsPercentage:
        savingsPercentage === "" || savingsPercentage === null
          ? "otro"
          : ["5", "10", "20"].includes(savingsPercentage)
          ? savingsPercentage
          : "otro",
      customSavingsPercentage:
        savingsPercentage !== "" &&
        !["5", "10", "20"].includes(savingsPercentage)
          ? savingsPercentage
          : "",
    },
  });

  const watchMonthlyIncome = watch("monthlyIncome");
  const watchMonthlyExpenses = watch("monthlyExpenses");
  const watchSavingsPercentage = watch("savingsPercentage");
  const watchCustomSavingsPercentage = watch("customSavingsPercentage");

  const handleNext = async () => {
    try {
      const response = await updateOnboarding({
        knowledgeLevel: formData.knowledgeLevel,
        goals: formData.goals,
        riskPreference: formData.riskPreference,
        monthlyIncome: watchMonthlyIncome,
        monthlyExpenses: watchMonthlyExpenses,
        savingsPercentage:
          watchSavingsPercentage === "otro"
            ? watchCustomSavingsPercentage
            : watchSavingsPercentage,
        userId: user.id,
      });

      if (response) {
        updateFormData({
          monthlyIncome: watchMonthlyIncome,
          monthlyExpenses: watchMonthlyExpenses,
          savingsPercentage:
            watchSavingsPercentage === "otro"
              ? watchCustomSavingsPercentage
              : watchSavingsPercentage,
        });
        nextStep();
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("No se pudo actualizar el onboarding", {
        description: errorMessage,
      });
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue(field, value ? parseFloat(value) : 0);
  };

  const isFormValid = () => {
    const isCustomPercentageValid =
      watchSavingsPercentage !== "otro" ||
      (watchSavingsPercentage === "otro" &&
        watchCustomSavingsPercentage >= 1 &&
        watchCustomSavingsPercentage <= 100);

    return (
      watchMonthlyIncome &&
      watchMonthlyExpenses &&
      watchSavingsPercentage &&
      isCustomPercentageValid
    );
  };

  const handleSaveAndContinueLater = async () => {
    try {
      const response = await updateOnboarding({
        knowledgeLevel: formData.knowledgeLevel,
        goals: formData.goals,
        riskPreference: formData.riskPreference,
        monthlyIncome: watchMonthlyIncome,
        monthlyExpenses: watchMonthlyExpenses,
        savingsPercentage:
          watchSavingsPercentage === "otro"
            ? watchCustomSavingsPercentage
            : watchSavingsPercentage,
        userId: user.id,
      });

      if (response) {
        updateFormData({
          monthlyIncome: watchMonthlyIncome,
          monthlyExpenses: watchMonthlyExpenses,
          savingsPercentage:
            watchSavingsPercentage === "otro"
              ? watchCustomSavingsPercentage
              : watchSavingsPercentage,
        });
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
          <button className="p-2 -ml-2" onClick={prevStep}>
            <ArrowLeft2 className="w-6 h-6" />
          </button>

          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-center">
              Tus números actuales
            </h1>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="monthlyIncome"
                  className="text-xl font-semibold block"
                >
                  ¿Cuál es tu ingreso mensual promedio?
                </label>
                <input
                  type="text"
                  value={formatCurrency(watchMonthlyIncome)}
                  onChange={(e) => handleInputChange(e, "monthlyIncome")}
                  placeholder="Ingrese su ingreso mensual"
                  className="input input-bordered w-full"
                />
                <p className="text-gray-500">Expresado en Pesos Argentinos</p>
                {errors.monthlyIncome && (
                  <p className="text-red-500">Este campo es obligatorio</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="monthlyExpenses"
                  className="text-xl font-semibold block"
                >
                  ¿Cuáles son tus gastos mensuales promedio?
                </label>
                <input
                  type="text"
                  value={formatCurrency(watchMonthlyExpenses)}
                  onChange={(e) => handleInputChange(e, "monthlyExpenses")}
                  placeholder="Ingrese sus gastos mensuales"
                  className="input input-bordered w-full"
                />
                <p className="text-gray-500">Expresado en Pesos Argentinos</p>
                {errors.monthlyExpenses && (
                  <p className="text-red-500">Este campo es obligatorio</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-xl font-semibold block">
                  ¿Qué porcentaje de tu ingreso estarías dispuesto a
                  ahorrar/invertir?
                </label>
                <div className="space-y-4">
                  {["5", "10", "20"].map((percentage) => (
                    <div
                      key={percentage}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        id={`percentage-${percentage}`}
                        value={percentage}
                        checked={watch("savingsPercentage") === percentage}
                        onChange={(e) =>
                          setValue("savingsPercentage", e.target.value)
                        }
                        className="radio radio-primary"
                      />
                      <label
                        htmlFor={`percentage-${percentage}`}
                        className="cursor-pointer"
                      >
                        {percentage} %
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="percentage-otro"
                      value="otro"
                      checked={watch("savingsPercentage") === "otro"}
                      onChange={(e) =>
                        setValue("savingsPercentage", e.target.value)
                      }
                      className="radio radio-primary"
                    />
                    <label htmlFor="percentage-otro" className="cursor-pointer">
                      Otro
                    </label>
                  </div>

                  {watchSavingsPercentage === "otro" && (
                    <div className="space-y-2 mt-4">
                      <label
                        htmlFor="customSavingsPercentage"
                        className="text-xl font-semibold block"
                      >
                        ¿Qué porcentaje deseas ahorrar/invertir?
                      </label>
                      <input
                        type="number"
                        id="customSavingsPercentage"
                        value={watch("customSavingsPercentage")}
                        onChange={(e) =>
                          setValue("customSavingsPercentage", e.target.value)
                        }
                        placeholder="Ingrese el porcentaje"
                        className="input input-bordered w-full"
                        min="1"
                        max="100"
                        step="10"
                      />
                      <p className="text-gray-500">Valor entre 1 y 100</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center py-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                    ${
                      step === 4
                        ? "border-primary bg-primary text-white"
                        : step < 4
                        ? "border-primary bg-white text-primary"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    {step < 4 ? "✓" : step}
                  </div>
                  {step < 4 && <div className="w-8 h-0.5 bg-gray-300" />}
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <button
                className="w-full btn btn-primary"
                onClick={handleSubmit(handleNext)}
                disabled={!isFormValid()}
              >
                Siguiente
              </button>

              <button
                type="button"
                className="w-full btn btn-outline"
                onClick={handleSaveAndContinueLater}
                disabled={!isFormValid()}
              >
                Guardar y continuar en otro momento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentNumbersPage.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
