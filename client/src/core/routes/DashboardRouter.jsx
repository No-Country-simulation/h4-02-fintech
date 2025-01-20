import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "../dashboard/pages/OnboardingPage";
import { InvestorDashboardPage } from "../dashboard/pages/InvestorDashboardPage";
import { AdminDashboardPage } from "../dashboard/pages/AdminDashboardPage";
import { useAuthStore } from "../auth/store/useAuthStore";
import { ProfileInvestorPage } from "../../modules/account/pages/ProfileInvestorPage";
import { useAuth0 } from "@auth0/auth0-react";

export const DashboardRouter = () => {
  const { user } = useAuthStore();
  const { user: userAuth0 } = useAuth0();
  const { logout: logoutStore } = useAuthStore();

  const roles = useMemo(() => {
    if (user?.roles?.length > 0) {
      return user.roles.map((role) => role.name.toUpperCase());
    }
    return [];
  }, [user]);

  useEffect(() => {
    if (
      !userAuth0 &&
      (user.oauthProvider === "GOOGLE" || user.oauthProvider === "APPLE")
    ) {
      logoutStore();
    }
  }, [logoutStore, user.oauthProvider, userAuth0]);

  return (
    <Routes>
      {/* Rutas de usuario estándar */}
      {(roles.includes("INVERSIONISTA") ||
        roles.includes("USER-STANDARD") ||
        roles.includes("USER")) && (
        <>
          <Route path="/" element={<InvestorDashboardPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/profile" element={<ProfileInvestorPage />} />
        </>
      )}

      {/* Rutas de administrador */}
      {(roles.includes("ADMIN") ||
        roles.includes("ADMINISTRADOR") ||
        roles.includes("ADMINISTRATOR")) && (
        <>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </>
      )}

      {/* Redirección por defecto */}
      <Route
        path="/*"
        element={<Navigate to={roles.includes("ADMIN") ? "/admin" : "/"} />}
      />
    </Routes>
  );
};
