import { Add } from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { goalValidationSchema } from "../../../../validators/goal";
import { useGoalStore } from "../../../store/useGoalStore";
import { toast } from "sonner";
import { createGoal } from "../../../services/goals";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getErrorMessage } from "../../../../validators/errorHandler";

export default function CreateGoalModal() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const addGoal = useGoalStore((state) => state.addGoal);

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

  const watchDesiredAmount = watch("desiredAmount");

  const handleCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^\d,.]/g, "");

    if (value) {
      let formattedValue = value.replace(".", ",");
      const matchedValue = formattedValue.match(/^\d*(,\d{0,2})/);
      if (matchedValue) {
        formattedValue = matchedValue[0];
      }

      setValue("desiredAmount", `${formattedValue}`);
    } else {
      setValue("desiredAmount", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const resp = await createGoal(user.id, {
        goalName: data.goalName,
        category: data.category,
        desiredAmount: parseFloat(data.desiredAmount.replace(", ", ".")),
        deadline: new Date(data.deadline).toISOString().split("T")[0],
      });
      addGoal(resp);
      toast("Objetivo creado", {
        description: "El objetivo se ha creado con éxito",
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("No se puedo crear el objetivo", {
        description: errorMessage,
      });
      console.error("Error creando objetivo", error);
    }

    setIsOpen(false);
    reset();
  };

  const formattedDesiredAmount = watchDesiredAmount
    ? `$ ${watchDesiredAmount.replace(".", ",")}`
    : "";

  return (
    <div className="px-4 py-2">
      <button
        className="btn btn-outline w-full"
        onClick={() => setIsOpen(true)}
      >
        <Add size="24" />
        Crear Nuevo Objetivo
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-black">
              Crear Nuevo Objetivo
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del Objetivo */}
            <div className="form-control">
              <label htmlFor="goalName" className="label">
                <span className="label-text">Nombre del Objetivo</span>
              </label>
              <input
                id="goalName"
                type="text"
                placeholder="Nombre del Objetivo"
                {...register("goalName")}
                className="input input-bordered w-full"
              />
              {errors.goalName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.goalName.message}
                </p>
              )}
            </div>

            {/* Categoría */}
            <div className="form-control">
              <label htmlFor="category" className="label">
                <span className="label-text">Categoría</span>
              </label>
              <select
                id="category"
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option value="">Selecciona una categoría</option>
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

            {/* Monto Deseado */}
            <div className="form-control">
              <label htmlFor="desiredAmount" className="label">
                <span className="label-text">Monto Deseado</span>
              </label>
              <input
                id="desiredAmount"
                type="text"
                value={formattedDesiredAmount}
                onChange={handleCurrencyInput}
                placeholder="Monto Deseado"
                className="input input-bordered w-full"
              />
              <p className="text-gray-500">Expresado en Pesos Argentinos</p>
              {errors.desiredAmount && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.desiredAmount.message}
                </p>
              )}
            </div>

            {/* Fecha Límite */}
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
                Guardar Objetivo
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
        </div>
      </dialog>
    </div>
  );
}
