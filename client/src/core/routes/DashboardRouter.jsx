import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "../dashboard/pages/OnboardingPage";
import { InvestorDashboardPage } from "../dashboard/pages/InvestorDashboardPage";
import { AdminDashboardPage } from "../dashboard/pages/AdminDashboardPage";
import { useAuthStore } from "../auth/store/useAuthStore";

export const DashboardRouter = () => {
  const { user } = useAuthStore();

  // Calcular roles una sola vez usando useMemo
  const roles = useMemo(() => {
    if (user?.roles?.length > 0) {
      return user.roles.map((role) => role.name.toUpperCase());
    }
    return [];
  }, [user]);

  return (
    <Routes>
      {/* Rutas de usuario estándar */}
      {(roles.includes("INVERSIONISTA") ||
        roles.includes("USER-STANDARD") ||
        roles.includes("USER")) && (
        <>
          <Route path="/" element={<InvestorDashboardPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
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
