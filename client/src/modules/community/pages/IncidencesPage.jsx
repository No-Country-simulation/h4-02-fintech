import { useEffect, useState } from "react";
import IncidentAccordion from "../components/IncidentAccordion";
import { fetchIncidents } from "../services/incidents";
import { Navbar } from "../../../core/dashboard/components/dashboard/admin/Navbar";

export const IncidencesPage = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents().then((result) => {
      setIncidents(result);
    });
  }, []);

  return (
    <div>
      <Navbar title="Incidencias reportadas" />
      {incidents.map((item) => (
        <IncidentAccordion key={item.id} incident={item} />
      ))}
    </div>
  );
};
