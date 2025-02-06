import { Navigate, Route, Routes } from "react-router-dom";
import { ForumPage } from "../../modules/community/pages/ForumPage";
import { NewsPage } from "../../modules/community/pages/NewsPage";
import { ReportIncidencePage } from "../../modules/community/pages/ReportIncidencePage";
import { ForgotPasswordPage } from "../auth/pages/ForgotPasswordPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { ResetPasswordPage } from "../auth/pages/ResetPasswordPage";
import { useAuthStore } from "../auth/store/useAuthStore";
import { DashboardRouter } from "./DashboardRouter";

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
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/report-incidence" element={<ReportIncidencePage />} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
};
