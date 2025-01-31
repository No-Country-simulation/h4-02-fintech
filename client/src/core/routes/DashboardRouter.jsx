import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "../dashboard/pages/OnboardingPage";
import { InvestorDashboardPage } from "../dashboard/pages/InvestorDashboardPage";
import { AdminDashboardPage } from "../dashboard/pages/AdminDashboardPage";
import { useAuthStore } from "../auth/store/useAuthStore";
import { ProfileInvestorPage } from "../../modules/account/pages/ProfileInvestorPage";
import { useAuth0 } from "@auth0/auth0-react";
import { TransactionsPage } from "../../modules/transactions/pages/TransactionsPage";
import { InvestmentLayout } from "../../modules/investment/pages/InvestmentLayout";
import { InvestmentPage } from "../../modules/investment/pages/InvestmentPage";
import { RecommendationPage } from "../../modules/investment/pages/RecommendationPage";
import { BondsPage } from "../../modules/investment/pages/investment/BondsPage";
import { EtfsPage } from "../../modules/investment/pages/investment/EtfsPage";
import { CommoditiesPage } from "../../modules/investment/pages/investment/CommoditiesPage";
import { ForexPage } from "../../modules/investment/pages/investment/ForexPage";
import { InstrumentDetailsPage } from "../../modules/investment/pages/instruments/InstrumentDetailsPage";
import { FiltersPage } from "../../modules/investment/pages/investment/FiltersPage";

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
      (!userAuth0 &&
        (user.provider === "google" || user.provider === "apple")) ||
      !sessionStorage.getItem("token")
    ) {
      logoutStore();
    }
  }, [logoutStore, user.provider, userAuth0]);

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
          <Route path="/transactions" element={<TransactionsPage />} />

          {/* Rutas de inversión con layout */}
          <Route path="/investment" element={<InvestmentLayout />}>
            <Route index element={<InvestmentPage />} /> {/* Ruta base */}
            <Route path="recommendation" element={<RecommendationPage />} />
          </Route>
          <Route path="/investment/bonds" element={<BondsPage />} />
          <Route path="/investment/forex" element={<ForexPage />} />
          <Route path="/investment/etfs" element={<EtfsPage />} />
          <Route path="/investment/commodities" element={<CommoditiesPage />} />
          <Route
            path="/investment/instrument/:type/:id"
            element={<InstrumentDetailsPage />}
          />
          <Route path="/investment/filter" element={<FiltersPage />} />
        </>
      )}

      {/* Rutas de administrador */}
      {(roles.includes("ADMIN") ||
        roles.includes("ADMINISTRADOR") ||
        roles.includes("ADMINISTRATOR")) && (
        <Route path="/admin" element={<AdminDashboardPage />} />
      )}

      {/* Redirección por defecto */}
      <Route
        path="/*"
        element={<Navigate to={roles.includes("ADMIN") ? "/admin" : "/"} />}
      />
    </Routes>
  );
};
