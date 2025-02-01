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
  const deadlineDate = new Date(goal.deadline);
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

          <div className="mb-4 mt-4">
            <h2 className="text-xl font-semibold mb-2 text-black">
              Agregar contribución para {`"${goal.goalName}"`}
            </h2>
            <p className="text-md">
              Monto deseado:{" "}
              <span className="badge badge-primary">
                ${goal.desiredAmount.toLocaleString("es-AR")}
              </span>
            </p>

            <p className="text-md mt-2">Contribuciones actuales:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {goal.contributions.map((contribution, index) => (
                <span key={index} className="badge bg-base-200">
                  ${contribution.amount.toLocaleString("es-AR")}
                </span>
              ))}
            </div>

            <p className="text-md mt-4">
              Fecha límite:{" "}
              <span
                className={`badge ${
                  isExpired ? "badge-error" : "badge-neutral"
                }`}
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

            {goal.contributions.length > 1 && (
              <p className="text-md mt-4">
                Total de contribuciones:{" "}
                <span className="badge badge-accent">
                  $
                  {goal.contributions
                    .reduce((sum, contribution) => sum + contribution.amount, 0)
                    .toLocaleString("es-AR")}
                </span>
              </p>
            )}
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
                <p className="text-gray-500">Expresado en Pesos Argentinos</p>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.amount.message}
                  </p>
                )}
              </div>

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
