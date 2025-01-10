import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../dashboard/pages/DashboardPage";

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
