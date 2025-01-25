import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  passwordValidations,
  resetPasswordValidationSchema,
} from "../../validators/login";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/login";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "../../validators/errorHandler";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const handlePasswordChange = (password) => {
    const feedback = passwordValidations.reduce((acc, validation) => {
      acc[validation.key] = validation.regex.test(password);
      return acc;
    }, {});
    setPasswordFeedback(feedback);
  };

  const onSubmit = async (data) => {
    try {
      if (!token) {
        return;
      }

      await resetPassword(token, data.password);
      toast.message("Contraseña actualizada", {
        description: "Su contraseña ha sido actualizada con éxito.",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);

      setErrorMessage("");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error:", error);
    }
  };

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm md:max-w-md shadow-none sm:shadow-xl bg-none sm:bg-white">
        <div className="card-body p-0 sm:p-8">
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Nueva contraseña</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  {...register("password", {
                    onChange: (e) => handlePasswordChange(e.target.value),
                  })}
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-white p-2"
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
              <ul className="text-sm mt-2">
                {passwordValidations.map(({ key, message }) => (
                  <li
                    key={key}
                    className={`${
                      passwordFeedback[key] ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {message}
                  </li>
                ))}
              </ul>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-white p-2"
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
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
