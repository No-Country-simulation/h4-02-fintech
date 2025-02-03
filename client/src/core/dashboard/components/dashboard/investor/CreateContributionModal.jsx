import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoalStore } from "../../../store/useGoalStore";
import { toast } from "sonner";
import { createContribution } from "../../../services/goals";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getErrorMessage } from "../../../../validators/errorHandler";
import { contributionValidationSchema } from "../../../../validators/contribution";
import PropTypes from "prop-types";
import { Money, MoneyAdd } from "iconsax-react";
import { formatCurrency } from "../../../../utils/formatCurrency";

export default function CreateContributionModal({ goal }) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { addContribution } = useGoalStore();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(contributionValidationSchema(goal)),
  });

  const watchAmount = watch("amount");

  const handleCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^\d,.]/g, "");

    if (value) {
      let formattedValue = value.replace(".", ",");
      const matchedValue = formattedValue.match(/^\d*(,\d{0,2})/);
      if (matchedValue) {
        formattedValue = matchedValue[0];
      }

      setValue("amount", `${formattedValue}`);
    } else {
      setValue("amount", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const resp = await createContribution(user.id, goal.id, {
        amount: parseFloat(data.amount.replace(",", ".")),
      });
      addContribution(resp);
      toast("Contribución agregada", {
        description: `Se agregó la contribución al objetivo ${goal.goalName}`,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("No se pudo agregar la contribución", {
        description: errorMessage,
      });
      console.error("Error creando la contribución", error);
    }

    setIsOpen(false);
    reset();
  };

  const formattedAmount = watchAmount
    ? `$ ${watchAmount.replace(".", ",")}`
    : "";
  const deadlineDate = new Date(`${goal.deadline}T23:59:59`);
  const today = new Date();
  const isExpired = deadlineDate < today;

  return (
    <>
      <button
        className="btn btn-secondary text-white m-0"
        onClick={() => setIsOpen(true)}
      >
        Ingresar Contribución
      </button>

      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
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

          <div className="mb-2 mt-2">
            <h2 className="text-xl font-semibold mb-2 text-primary">
              Agregar contribución para
            </h2>

            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {goal.goalName}
              </h3>
              <div className="flex flex-col flex-wrap justify-end items-end space-y-2">
                <p className="text-sm text-gray-400 text-nowrap">
                  <span
                    className={`badge ${isExpired ? "badge-error" : "badge"}`}
                  >
                    {isExpired
                      ? "Fecha expirada"
                      : deadlineDate.toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </span>
                </p>
                <p className="flex space-x-2">
                  <span className="badge badge-primary">
                    {formatCurrency(goal.desiredAmount, "ARG", 2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {!isExpired && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label htmlFor="amount" className="label">
                  <span className="label-text">Monto</span>
                </label>
                <input
                  id="amount"
                  type="text"
                  value={formattedAmount}
                  onChange={handleCurrencyInput}
                  placeholder="Monto"
                  className="input input-bordered w-full"
                />
                <p className="text-gray-500 text-sm ">
                  Expresado en Pesos Argentinos
                </p>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <h3 className="text-md mt-2 text-primary font-semibold">
                Últimas contribuciones
              </h3>
              <div className="sm:max-h-20 overflow-x-auto sm:overflow-y-auto flex sm:flex-col space-x-0 ">
                {[...goal.contributions]
                  .reverse()
                  .map((contribution, index) => (
                    <div key={index} className="flex flex-col mr-6 sm:mr-0">
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400 text-nowrap">
                          {new Date(contribution.date).toLocaleDateString(
                            "es-AR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <MoneyAdd size="24" />
                        <p>{formatCurrency(contribution.amount, "ARG", 2)}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <h3 className="text-md mt-2 text-primary font-semibold">
                Total de contribuciones
              </h3>
              {goal.contributions.length > 1 && (
                <p className="text-md mt-2 flex space-x-2">
                  <Money size="24" />
                  <span>
                    {formatCurrency(
                      goal.contributions.reduce(
                        (sum, contribution) => sum + contribution.amount,
                        0
                      ),
                      "ARG",
                      2
                    )}
                  </span>
                </p>
              )}

              <div className="space-y-2 mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  Agregar contribución
                </button>
                <button
                  type="button"
                  className="btn btn-outline w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

CreateContributionModal.propTypes = {
  goal: PropTypes.object,
};
