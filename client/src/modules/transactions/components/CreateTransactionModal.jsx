import {
  Add,
  Bank,
  Car,
  Game,
  Health,
  Home2,
  Money,
  Shop,
  Teacher,
} from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionValidationSchema } from "../../../core/validators/transactions";
import { getErrorMessage } from "../../../core/validators/errorHandler";
import { toast } from "sonner";
import { createTransaction } from "../services/transactions";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";

export default function CreateTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("OUT");
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(transactionValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resp = await createTransaction({
        description: data.title,
        value: parseFloat(data.amount.replace(",", ".")),
        state: state,
        user: user.id,
        date: new Date(data.date).toISOString().split("T")[0],
      });
      console.log(resp);
      toast("Transacción exitosa", {
        description: "Transacción creada con éxito",
      });
      setIsOpen(false);
      reset();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const watchAmount = watch("amount");

  const handleCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^\d,.]/g, "");

    if (value) {
      let formattedValue = value.replace(",", ".");
      const matchedValue = formattedValue.match(/^\d*(\.\d{0,2})/);
      if (matchedValue) {
        formattedValue = matchedValue[0];
      }

      setValue("amount", formattedValue.replace(".", ","));
    } else {
      setValue("amount", "");
    }
  };

  const formattedAmount = watchAmount
    ? `$ ${watchAmount.replace(".", ",")}`
    : "";

  const onClickCategory = (category) => {
    setIsOpen(true);
    setState(category);
  };

  return (
    <div className="px-4 py-2">
      {/* Categories Grid */}
      <div className="flex justify-center items-center gap-2 mb-4 mt-2">
        <button
          className="btn btn-accent shadow-2xl rounded"
          onClick={() => onClickCategory("IN")}
        >
          Agregar ingreso
        </button>
      </div>
      <h2 className="text-start font-semibold mb-2">Agregar Gastos</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
        {[
          {
            icon: <Home2 size={32} variant="Bold" className="text-white" />,
            label: "Alquiler",
            state: "OUT",
          },
          {
            icon: <Car size={32} variant="Bold" className="text-white" />,
            label: "Transporte",
            state: "OUT",
          },
          {
            icon: <Health size={32} variant="Bold" className="text-white" />,
            label: "Medicina",
            state: "OUT",
          },
          {
            icon: <Bank size={32} variant="Bold" className="text-white" />,
            label: "Impuestos",
            state: "OUT",
          },
          {
            icon: <Shop size={32} variant="Bold" className="text-white" />,
            label: "Almacén",
            state: "OUT",
          },
          {
            icon: <Game size={32} variant="Bold" className="text-white" />,
            label: "Esparcimiento",
            state: "OUT",
          },
          {
            icon: <Teacher size={32} variant="Bold" className="text-white" />,
            label: "Escolaridad",
            state: "OUT",
          },
          {
            icon: <Money size={32} variant="Bold" className="text-white" />,
            label: "Ahorro",
            state: "OUT",
          },
          {
            icon: <Add size={32} variant="Bold" className="text-white" />,
            label: "Otros",
            state: "OUT",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-1 normal-case"
          >
            <button
              className="btn btn-secondary btn-square shadow-2xl rounded-2xl"
              onClick={() => onClickCategory(item.state)}
            >
              <span>{item.icon}</span>
            </button>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>

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
            <h2 className="text-xl font-semibold mb-2 text-primary">
              Agregar {state === "IN" ? "ingreso" : "gasto"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Título */}
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Título</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Título de la transacción"
                {...register("title")}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Importe */}
            <div className="form-control">
              <label htmlFor="amount" className="label">
                <span className="label-text">Importe</span>
              </label>
              <input
                id="amount"
                type="text"
                value={formattedAmount}
                onChange={handleCurrencyInput}
                placeholder="Monto de la transacción"
                className="input input-bordered w-full"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Fecha */}
            <div className="form-control">
              <label htmlFor="date" className="label">
                <span className="label-text">Fecha</span>
              </label>
              <input
                id="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("date")}
                className="input input-bordered w-full"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Guardar
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
