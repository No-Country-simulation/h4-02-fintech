import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerWithEmail } from "../services/register";
import { useAuthStore } from "../store/useAuthStore";
import { getErrorMessage } from "../../validators/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  passwordValidations,
  registerValidationSchema,
} from "../../validators/register";
import loginDesktopImage from "../../../assets/images/login-desktop.svg";
import iupiDesktopImage from "../../../assets/images/iupi-desktop.svg";
import sloganDesktopImage from "../../../assets/images/slogan-desktop.svg";

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
  const [passwordFeedback, setPasswordFeedback] = useState({});
  const { login } = useAuthStore();

  const handlePasswordChange = (password) => {
    const feedback = passwordValidations.reduce((acc, validation) => {
      acc[validation.key] = validation.regex.test(password);
      return acc;
    }, {});
    setPasswordFeedback(feedback);
  };

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
      sessionStorage.setItem("token", token);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="hero min-h-screen bg-gray-50 p-4">
      <div className="sm:hero-content w-full flex-col sm:flex-row">
        <div className="text-center lg:text-left sm:w-1/2 hidden sm:flex ">
          <div className="flex justify-center items-center flex-col">
            <img src={loginDesktopImage} alt="login-desktop" />
            <img
              src={iupiDesktopImage}
              alt="iupi-desktop"
              className="w-[200] h-[130] max-w-[260]"
            />
            <img
              src={sloganDesktopImage}
              alt="slogan-desktop"
              className="w-[200] h-[130] max-w-[260] mt-2"
            />
          </div>
        </div>

        <div className="card w-full shadow-none sm:shadow-xl bg-none sm:bg-[#DDE9E6] sm:w-1/2 rounded-none sm:rounded-[4px]">
          <div className="flex justify-center sm:hidden">
            <img
              src={iupiDesktopImage}
              alt="iupi-desktop"
              className="w-[170] h-[100] max-w-[180]"
            />
          </div>
          <div className="card-body p-0 sm:p-8">
            <h1 className="text-xl text-primary sm:text-2xl font-bold text-center mb-8">
              Bienvenido a la plataforma
            </h1>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
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
                        passwordFeedback[key] ? "text-success" : "text-gray-500"
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
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
