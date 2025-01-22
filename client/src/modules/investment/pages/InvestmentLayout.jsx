import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../../core/dashboard/components/dashboard/ui/Navbar";

export const InvestmentLayout = () => {
  return (
    <div className="bg-gray-50">
      <Navbar title="Gestión de inversiones" />
      <div className="container mx-auto p-4">
        <div role="tablist" className="tabs tabs-bordered mb-4">
          <NavLink
            to="/dashboard/investment"
            end
            role="tab"
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Explorar
          </NavLink>
          <NavLink
            to="/dashboard/investment/recommendation"
            end
            role="tab"
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Recomendaciones
          </NavLink>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
