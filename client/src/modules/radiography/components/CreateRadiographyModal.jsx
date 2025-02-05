import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrUpdateRadiography } from "../services/radiography";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { useRadiographyStore } from "../store/radiograpy";

export default function CreateRadiographyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { radiographyData, reset: resetStore } = useRadiographyStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (radiographyData) {
      setValue("age_range", radiographyData.age_range);
      setValue("evolution_tool", radiographyData.evolution_tool);
      setValue("insurance", radiographyData.insurance);
    }
  }, [radiographyData, setValue]);

  const onSubmit = async (data) => {
    try {
      await createOrUpdateRadiography(user.id, data);
      await resetStore();
      toast("Información guardada", {
        description: "La información se ha guardado con éxito",
      });
      setIsOpen(false);
      reset();
    } catch (error) {
      toast("Error al guardar la información", {
        description: "Ha ocurrido un error al guardar la información",
      });
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    if (radiographyData) {
      reset(radiographyData);
    } else {
      reset();
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="flex justify-center">
        <button
          className="btn btn-primary w-full sm:max-w-md"
          onClick={handleOpenModal}
        >
          {!radiographyData ? "Completar" : "Editar"} tus datos
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-primary">
              Información de Inversión y Seguro
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Rango Etario */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Rango Etario</span>
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { value: "menos de 25", label: "Menos de 25" },
                  { value: "25 a 35", label: "25 a 35" },
                  { value: "36 a 55", label: "36 a 55" },
                  { value: "más de 56", label: "Más de 56 años" },
                ].map((age) => (
                  <label
                    key={age.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      value={age.value}
                      {...register("age_range", {
                        required: "Este campo es requerido",
                      })}
                      className="radio radio-primary"
                    />
                    <span>{age.label}</span>
                  </label>
                ))}
              </div>
              {errors.age_range && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.age_range.message}
                </p>
              )}
            </div>

            {/* Herramientas de Inversión */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  ¿Qué herramientas utilizas para seguir la evolución de tus
                  inversiones?
                </span>
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { value: "ninguna", label: "Ninguna" },
                  {
                    value: "medios de comunicación",
                    label: "Medios de comunicación",
                  },
                  { value: "redes sociales", label: "Redes sociales" },
                  { value: "gráficos", label: "Gráficos" },
                ].map((tool) => (
                  <label
                    key={tool.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      value={tool.value}
                      {...register("evolution_tool", {
                        required: "Este campo es requerido",
                      })}
                      className="radio radio-primary"
                    />
                    <span>{tool.label}</span>
                  </label>
                ))}
              </div>
              {errors.evolution_tool && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.evolution_tool.message}
                </p>
              )}
            </div>

            {/* Seguro para Auto */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  ¿Qué seguro elegirías para un auto nuevo?
                </span>
              </label>
              <div className="flex flex-col space-y-2">
                {[
                  { value: "riesgo", label: "Contra todo riesgo" },
                  { value: "destrucción", label: "Destrucción parcial" },
                  { value: "terceros", label: "Contra terceros" },
                  { value: "ninguna", label: "Ninguno si pudiera" },
                ].map((insurance) => (
                  <label
                    key={insurance.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      value={insurance.value}
                      {...register("insurance", {
                        required: "Este campo es requerido",
                      })}
                      className="radio radio-primary"
                    />
                    <span>{insurance.label}</span>
                  </label>
                ))}
              </div>
              {errors.insurance && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.insurance.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Aceptar
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
