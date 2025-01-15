import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { OnboardingPage } from "../dashboard/pages/OnboardingPage";
import { InvestorDashboardPage } from "../dashboard/pages/InvestorDashboardPage";
import { AdminDashboardPage } from "../dashboard/pages/AdminDashboardPage";

export const DashboardRouter = () => {
  const [rol /* setRol */] = useState("user-standard");

  return (
    <>
      {rol === "user-standard" && (
        <Routes>
          <Route path="/" element={<InvestorDashboardPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {rol === "admin" && (
        <Routes>
          <Route path="/" element={<AdminDashboardPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};
