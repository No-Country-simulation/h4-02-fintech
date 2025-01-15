import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { DashboardRouter } from "./DashboardRouter";
import { ForgotPasswordPage } from "../auth/pages/ForgotPasswordPage";
import { useAuthStore } from "../auth/store/useAuthStore";
import { ResetPasswordPage } from "../auth/pages/ResetPasswordPage";

export const AppRouter = () => {
  const { status } = useAuthStore();

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard/*" element={<DashboardRouter />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
};
