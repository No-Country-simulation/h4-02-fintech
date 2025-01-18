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
  const { user } = useAuthStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      monthlyIncome: formData.monthlyIncome,
      monthlyExpenses: formData.monthlyExpenses,
      savingsPercentage: ["5", "10", "20"].includes(formData.savingsPercentage)
        ? formData.savingsPercentage
        : "otro",
      customSavingsPercentage: !["", "5", "10", "20"].includes(
        formData.savingsPercentage
      )
        ? formData.savingsPercentage
        : "",
    },
  });

  const watchFields = watch([
    "monthlyIncome",
    "monthlyExpenses",
    "savingsPercentage",
    "customSavingsPercentage",
  ]);

  const handleInputChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue(field, value ? parseFloat(value) : "");
  };

  const isFormValid = () => {
    const [income, expenses, savings, customSavings] = watchFields;
    return (
      income &&
      expenses &&
      (savings !== "otro" || (customSavings >= 1 && customSavings <= 100))
    );
  };

  const handleSave = async (redirect = false) => {
    const [income, expenses, savings, customSavings] = watchFields;
    const payload = {
      ...formData,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      savingsPercentage: savings === "otro" ? customSavings : savings,
      userId: user.id,
    };

    try {
      const response = await updateOnboarding(payload);
      if (response) {
        updateFormData(payload);
        toast("Onboarding actualizado", {
          description: "Se ha actualizado el onboarding",
        });
        if (redirect) navigate("/dashboard");
        else nextStep();
      }
    } catch (error) {
      toast.error("No se pudo actualizar el onboarding", {
        description: getErrorMessage(error),
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
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Tus números actuales
          </h1>

          <div className="space-y-6">
            {["monthlyIncome", "monthlyExpenses"].map((field, index) => (
              <div key={field} className="space-y-2">
                <label htmlFor={field} className="text-xl font-semibold block">
                  {index === 0
                    ? "¿Cuál es tu ingreso mensual promedio?"
                    : "¿Cuáles son tus gastos mensuales promedio?"}
                </label>
                <input
                  type="text"
                  value={formatCurrency(watchFields[index])}
                  onChange={(e) => handleInputChange(e, field)}
                  placeholder={
                    index === 0
                      ? "Ingrese su ingreso mensual"
                      : "Ingrese sus gastos mensuales"
                  }
                  className="input input-bordered w-full"
                />
                <p className="text-gray-500">Expresado en Pesos Argentinos</p>
                {errors[field] && (
                  <p className="text-red-500">Este campo es obligatorio</p>
                )}
              </div>
            ))}

            <div className="space-y-4">
              <label className="text-xl font-semibold block">
                ¿Qué porcentaje de tu ingreso estarías dispuesto a
                ahorrar/invertir?
              </label>
              <div className="space-y-4">
                {["5", "10", "20", "otro"].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`savings-${value}`}
                      value={value}
                      checked={watchFields[2] === value}
                      onChange={() => setValue("savingsPercentage", value)}
                      className="radio radio-primary"
                    />
                    <label
                      htmlFor={`savings-${value}`}
                      className="cursor-pointer"
                    >
                      {value === "otro" ? "Otro" : `${value} %`}
                    </label>
                  </div>
                ))}
                {watchFields[2] === "otro" && (
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
                      value={watchFields[3]}
                      onChange={(e) =>
                        setValue("customSavingsPercentage", e.target.value)
                      }
                      placeholder="Ingrese el porcentaje"
                      className="input input-bordered w-full"
                      min="1"
                      max="100"
                      step="1"
                    />
                    <p className="text-gray-500">Valor entre 1 y 100</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              className="w-full btn btn-primary"
              onClick={handleSubmit(() => handleSave(false))}
              disabled={!isFormValid()}
            >
              Siguiente
            </button>

            <button
              type="button"
              className="w-full btn btn-outline"
              onClick={() => handleSave(true)}
              disabled={!isFormValid()}
            >
              Guardar y continuar en otro momento
            </button>
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
