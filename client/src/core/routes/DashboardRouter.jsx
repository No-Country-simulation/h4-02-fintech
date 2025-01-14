import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../dashboard/pages/DashboardPage";
import { OnboardingPage } from "../dashboard/pages/OnboardingPage";

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
