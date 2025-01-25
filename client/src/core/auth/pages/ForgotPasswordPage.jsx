import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "../../validators/errorHandler";
import { forgotPasswordValidationSchema } from "../../validators/login";
import { sendForgotPasswordEmail } from "../services/login";
import { toast } from "sonner";

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await sendForgotPasswordEmail(data.email);
      toast.message("Enlace enviado", {
        description: "Se ha enviado un enlace para recuperar su contraseña.",
      });
      setErrorMessage("");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error al enviar solicitud de recuperación:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm md:max-w-md shadow-none sm:shadow-xl bg-none sm:bg-white">
        <div className="card-body p-0 sm:p-8">
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@user.com"
                {...register("email")}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-8">
              Recuperar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
