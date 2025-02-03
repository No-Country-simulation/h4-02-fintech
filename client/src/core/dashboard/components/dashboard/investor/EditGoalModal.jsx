import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { goalValidationSchema } from "../../../../validators/goal";
import { useGoalStore } from "../../../store/useGoalStore";
import { toast } from "sonner";
import { updateGoal } from "../../../services/goals";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getErrorMessage } from "../../../../validators/errorHandler";
import { Edit } from "iconsax-react";
import CreateContributionModal from "./CreateContributionModal";

export default function EditGoalModal({ goalId }) {
  const { user } = useAuthStore();
  const { goals, updateGoal: updateGoalState } = useGoalStore();
  const goal = goals.find((g) => g.id === goalId);
  const [isOpen, setIsOpen] = useState(false);

  const totalContributions =
    goal?.contributions?.reduce(
      (sum, contribution) => sum + contribution.amount,
      0
    ) || 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(goalValidationSchema),
  });

  useEffect(() => {
    if (goal) {
      setValue("goalName", goal.goalName);
      setValue("category", goal.category);
      setValue(
        "desiredAmount",
        goal.desiredAmount.toString().replace(".", ",")
      );
      setValue("deadline", goal.deadline);
    }
  }, [goal, setValue]);

  const watchDesiredAmount = watch("desiredAmount");

  const handleCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^\d,.]/g, "");

    if (value) {
      let formattedValue = value.replace(".", ",");
      const matchedValue = formattedValue.match(/^\d*(,\d{0,2})?/);
      if (matchedValue) {
        formattedValue = matchedValue[0];
      }
      setValue("desiredAmount", `${formattedValue}`);
    } else {
      setValue("desiredAmount", "");
    }
  };

  const onSubmit = async (data) => {
    const parsedDesiredAmount = parseFloat(
      data.desiredAmount.replace(",", ".")
    );

    if (parsedDesiredAmount < totalContributions) {
      toast.error(
        "El monto deseado no puede ser menor a las contribuciones totales."
      );
      return;
    }

    try {
      const updatedGoal = {
        ...goal,
        goalName: data.goalName,
        category: data.category,
        desiredAmount: parsedDesiredAmount,
        deadline: new Date(data.deadline).toISOString().split("T")[0],
      };

      const resp = await updateGoal(user.id, goal.id, updatedGoal);
      updateGoalState(goal.id, resp);
      toast("Objetivo actualizado", {
        description: "El objetivo se ha actualizado con éxito",
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("No se pudo actualizar el objetivo", {
        description: errorMessage,
      });
      console.error("Error actualizando objetivo", error);
    }

    setIsOpen(false);
    reset();
  };

  const formattedDesiredAmount = watchDesiredAmount
    ? `$ ${watchDesiredAmount.replace(".", ",")}`
    : "";

  return (
    <div>
      <button
        className="btn btn-ghost btn-square"
        onClick={() => setIsOpen(true)}
      >
        <Edit size={24} className="text-primary" />
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

          {!goal ? (
            //Objetivo no encontrado
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Objetivo no encontrado
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                El objetivo que buscas no existe.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Editar Objetivo
                </h2>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Contribuciones totales: ${" "}
                  {totalContributions.toLocaleString()}
                </p>
                {goal.progress < 100 && <CreateContributionModal goal={goal} />}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label htmlFor="goalName" className="label">
                    <span className="label-text">Nombre del Objetivo</span>
                  </label>
                  <input
                    id="goalName"
                    type="text"
                    {...register("goalName")}
                    className="input input-bordered w-full"
                  />
                  {errors.goalName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.goalName.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="category" className="label">
                    <span className="label-text">Categoría</span>
                  </label>
                  <select
                    id="category"
                    {...register("category")}
                    className="select select-bordered w-full text-primary"
                  >
                    <option value="vacaciones">Vacaciones</option>
                    <option value="retiro">Ahorrar para mi retiro</option>
                    <option value="bienes">Comprar bienes</option>
                    <option value="proyecto">Financiar proyecto</option>
                    <option value="otros">Otro</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="desiredAmount" className="label">
                    <span className="label-text">Monto Deseado</span>
                  </label>
                  <input
                    id="desiredAmount"
                    type="text"
                    value={formattedDesiredAmount}
                    onChange={handleCurrencyInput}
                    className="input input-bordered w-full"
                  />
                  {errors.desiredAmount && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.desiredAmount.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="deadline" className="label">
                    <span className="label-text">Fecha Límite</span>
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("deadline", {
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        return (
                          selectedDate >= currentDate ||
                          "La fecha debe ser hoy o en el futuro."
                        );
                      },
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.deadline && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 mt-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Guardar Cambios
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
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

//Prop-types
EditGoalModal.propTypes = {
  goalId: PropTypes.any,
};
