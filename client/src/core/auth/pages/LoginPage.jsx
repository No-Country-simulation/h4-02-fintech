import { useForm } from "react-hook-form";
import { Apple, Eye, EyeSlash, Google } from "iconsax-react";
import { getErrorMessage } from "../../validators/errorHandler";
import { useAuthStore } from "../store/useAuthStore";
import { loginWithEmail, loginWithSocial } from "../services/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../validators/login";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import loginDesktopImage from "../../../assets/images/login-desktop.svg";
import iupiDesktopImage from "../../../assets/images/iupi-desktop.svg";
import sloganDesktopImage from "../../../assets/images/slogan-desktop.svg";

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
  const { loginWithPopup, user, isAuthenticated, isLoading } = useAuth0();

  const [provider, setProvider] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && provider) {
      const loginWithProvider = async () => {
        try {
          const response = await loginWithSocial(provider, user);
          const { user: userBackendResponse, token } = response;

          if (!userBackendResponse) {
            setErrorMessage(`Error al iniciar sesión con ${provider}`);
            return;
          }

          login({ ...userBackendResponse, provider: provider });
          sessionStorage.setItem("token", token);
        } catch (error) {
          setErrorMessage(`Error al iniciar sesión con ${provider}`);
          console.error(error);
        }
      };

      loginWithProvider();
    }
  }, [isAuthenticated, isLoading, user, provider, login]);

  const loginWithProviderPopup = async (selectedProvider) => {
    try {
      setProvider(selectedProvider);
      await loginWithPopup({
        connection: selectedProvider === "google" ? "google-oauth2" : "apple",
      });
    } catch (error) {
      setErrorMessage(`Error al iniciar sesión con ${selectedProvider}`);
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginWithEmail({
        email: data.email,
        password: data.password,
      });

      const user = response.user;
      const token = response.token;
      login(user);
      sessionStorage.setItem("token", token);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
      console.error("Error al iniciar sesión:", error);
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
          <h1 className="text-2xl sm:text-2xl font-bold text-center mb-8 sm:my-4 sm:mb-0 text-primary">
            Bienvenido a la plataforma
          </h1>
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

            <div className="text-end mt-1">
              <p className="text-sm">
                ¿Eres nuevo?{" "}
                <a href="/auth/register" className="btn btn-link p-0">
                  Regístrate
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center mt-4">
              <button
                type="button"
                onClick={() => loginWithProviderPopup("google")}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Google size="24" variant="Bold" />
                <span>Continuar con Google</span>
              </button>

              <button
                type="button"
                onClick={() => loginWithProviderPopup("apple")}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <Apple size="24" variant="Bold" />
                <span>Continuar con Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
