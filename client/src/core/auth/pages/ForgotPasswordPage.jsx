import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "../../validators/errorHandler";
import { forgotPasswordValidationSchema } from "../../validators/login";

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      console.log(data);
      /* await sendForgotPasswordEmail(data.email);  */
      setSuccessMessage(
        "Se ha enviado un enlace para recuperar su contraseña."
      );
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

          {successMessage && (
            <p className="text-green-500 text-sm font-bold mb-4">{successMessage}</p>
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
