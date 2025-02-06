import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchIncidentCount } from "../../../modules/community/services/incidents";
import { Header } from "../components/dashboard/admin/Header";

export const AdminDashboardPage = () => {
  const [incidentCount, setIncidentCount] = useState(0);

  useEffect(() => {
    fetchIncidentCount().then((result) => {
      setIncidentCount(result);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-2 w-full max-w-3xl p-4 m-auto">
        {/* System Status */}
        <Link className="relative flex items-center w-full p-4 text-left bg-[#f1efef] hover:bg-gray-50 rounded-lg shadow-md transition-colors cursor-pointer">
          <span className="text-gray-900">Estado del sistema</span>
          <div className="absolute right-4 w-2.5 h-2.5 bg-green-500 rounded-full" />
        </Link>

        {/* Reported Incidents */}
        <Link
          className="relative flex items-center w-full p-4 text-left bg-[#f1efef] hover:bg-gray-50 rounded-lg shadow-md transition-colors cursor-pointer"
          to={"/dashboard/admin/incidences"}
        >
          <span className="text-gray-900">Incidencias reportadas</span>
          <span className="absolute right-4 min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-xs font-medium rounded-full px-1">
            {incidentCount}
          </span>
        </Link>

        {/* API Connection Errors */}
        <Link className="flex items-center w-full p-4 text-left bg-[#f1efef] hover:bg-gray-50 rounded-lg shadow-md transition-colors cursor-pointer">
          <span className="text-gray-900">Errores de Conexión con APIs</span>
        </Link>

        {/* Active Users */}
        <Link className="flex items-center w-full p-4 text-left bg-[#f1efef] hover:bg-gray-50 rounded-lg shadow-md transition-colors cursor-pointer">
          <span className="text-gray-900">Usuarios Activos Actualmente</span>
        </Link>
      </div>
    </div>
  );
};
