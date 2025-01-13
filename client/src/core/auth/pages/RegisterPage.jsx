import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerWithEmail } from "../services/register";
import { useAuthStore } from "../store/useAuthStore";
import { getErrorMessage } from "../../validators/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../validators/register";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      const response = await registerWithEmail({
        dni: data.dni,
        email: data.email,
        password: data.password,
        name: data.name + " " + data.surname,
      });

      const user = response.user;
      const token = response.token;
      login(user);
      localStorage.setItem("token", token);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm md:max-w-md shadow-none sm:shadow-xl bg-none sm:bg-white">
        <div className="card-body p-0 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-8">
            Bienvenido a la plataforma
          </h1>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="dni" className="label">
                <span className="label-text">DNI</span>
              </label>
              <input
                id="dni"
                type="text"
                placeholder="DNI"
                {...register("dni")}
                className="input input-bordered w-full"
              />
              {errors.dni && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.dni.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                {...register("name")}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="surname" className="label">
                <span className="label-text">Apellido</span>
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Apellido"
                {...register("surname")}
                className="input input-bordered w-full"
              />
              {errors.surname && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.surname.message}
                </p>
              )}
            </div>

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

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Nueva contraseña</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  {...register("password")}
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">Repetir nueva contraseña</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  {...register("confirmPassword")}
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-8">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
