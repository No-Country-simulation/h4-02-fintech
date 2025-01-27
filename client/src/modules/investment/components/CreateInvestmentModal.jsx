import { PropTypes } from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { createExchage } from "../services/instrument";
import { getErrorMessage } from "../../../core/validators/errorHandler";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { investmentSchema } from "../../../core/validators/investment";

export default function CreateInvestmentModal({ instrument }) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("BUY");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(investmentSchema),
    defaultValues: {
      quantity: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createExchage({
        userId: user.id,
        value: parseFloat(instrument.price.replace(/[^\d.-]/g, "")),
        coin: instrument.id,
        state: state,
        quantity: parseInt(data.quantity, 10),
      });

      toast(`${state === "BUY" ? "Comprado" : "Vendido"}`, {
        description: `Se ${state === "BUY" ? "compró" : "vendió"} ${
          instrument?.name || ""
        }`,
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

  const onBy = () => {
    setState("BUY");
    setIsOpen(true);
  };

  const onSell = () => {
    setState("SELL");
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex gap-4 sm:max-w-sm">
        <button className="btn btn-primary flex-1 text-lg" onClick={onBy}>
          Comprar
        </button>
        <button className="btn btn-primary flex-1 text-lg" onClick={onSell}>
          Vender
        </button>
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

          <div className="mb-4">
            <h3 className="text-xl font-semibold">
              Agregar {instrument?.name || ""}
            </h3>
            <p className="text-gray-500 mt-2">
              Precio Actual: {instrument?.price || ""}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Cantidad de monedas */}
            <div className="form-control">
              <label htmlFor="quantity" className="label">
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                {...register("quantity")}
                placeholder="Cantidad"
                className="input input-bordered w-full"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <button type="submit" className="btn btn-primary w-full">
                {state === "BUY" ? "Comprar" : "Vender"}
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

CreateInvestmentModal.propTypes = {
  instrument: PropTypes.object,
};
