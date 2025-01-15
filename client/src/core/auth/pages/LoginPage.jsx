import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "iconsax-react";
import { getErrorMessage } from "../../validators/errorHandler";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { loginWithEmail } from "../services/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../validators/login";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      const response = await loginWithEmail({
        email: data.email,
        password: data.password,
      });

      const user = response.user;
      const token = response.token;
      login(user);
      localStorage.setItem("token", token);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error al iniciar sesión:", error);
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
                <span className="label-text">Contraseña</span>
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

            <div className="text-right mt-2">
              <a href="/auth/forgot-password" className="btn btn-link">
                ¿Ha olvidado su contraseña?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Iniciar Sesión
            </button>
          </form>

          <div className="text-end mt-4">
            <p className="text-sm">
              ¿Eres nuevo?{" "}
              <a href="/auth/register" className="btn btn-link p-0">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
