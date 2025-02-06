"use client";

import {
  AlertCircle,
  CheckSquare,
  ChevronDown,
  Clock,
  Info,
  RefreshCw,
  Target,
  Timer,
  User,
  UserCheck,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function IncidentAccordion({ incident }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2 mt-8">
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleItem(incident.id)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <span className="font-medium">ID de incidencia: {incident.id}</span>
          <ChevronDown
            className={`transform transition-transform duration-200 ${
              openItems.includes(incident.id) ? "rotate-180" : ""
            }`}
          />
        </button>

        {openItems.includes(incident.id) && (
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">Fecha y hora: {incident.date}</p>
            </div>

            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">Usuario afectado: {incident.user.name}</p>
            </div>

            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">Área afectada: {incident.affectedArea}</p>
            </div>

            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">
                Descripción del problema: {incident.description}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-sm">Estado: Pendiente</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">
                Última actualización: {incident.lastUpdate}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 mt-1 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Acciones tomadas:</p>
                <ul className="mt-1 space-y-1">
                  {incident.takenActions.map((accion, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      {accion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">Asignado a: {incident.assignedTo}</p>
            </div>

            <div className="flex items-start gap-2">
              <Timer className="w-4 h-4 mt-1 text-gray-500" />
              <p className="text-sm">
                Tiempo estimado de resolución: {incident.estimated}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

IncidentAccordion.propTypes = {
  incident: PropTypes.object.isRequired,
};
