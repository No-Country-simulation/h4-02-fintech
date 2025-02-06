import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { Navbar } from "../../../core/dashboard/components/dashboard/ui/Navbar";
import { PostEditor } from "../components/PostEditor";
import { createIncidence } from "../services/incidents";

const affectedAreas = {
  auth: "Inicio de sesión",
  onboarding: "Onboarding",
  profile: "Edición de mi perfil",
  inversions: "Inversiones",
  "income-expenses": "Ingresos y egresos",
  savings: "Ahorros",
  community: "Foro y comunidad",
  other: "Otro",
};

export const ReportIncidencePage = () => {
  const { user } = useAuthStore();
  const [sendingIncidence, setSendingIncidence] = useState(false);
  const [affectedArea, setAffectedArea] = useState("");

  const handlePublishIncidence = (content) => {
    setSendingIncidence(true);
    const affectedAreaText = affectedAreas[affectedArea] || "Otro";
    createIncidence(user.id, affectedAreaText, content)
      .then(() => {
        toast.message("Incidencia enviada", {
          description: "La incidencia se ha enviado con éxito",
        });
        setAffectedArea("");
      })
      .finally(() => {
        setSendingIncidence(false);
      });
  };

  return (
    <div>
      <Navbar title="Ayuda y soporte técnico" />
      <div className="max-w-4xl mx-auto p-4">
        <p className="my-5 text-lg">
          Por favor, describe detalladamente el problema que encontraste en la
          plataforma. Incluye los pasos para reproducirlo, el mensaje de error
          (si aplica) y cualquier otro detalle que pueda ayudarnos a resolver la
          incidencia más rápido. ¡Gracias por tu ayuda!
        </p>

        <div>
          <p className="mb-5">Área afectada</p>
          <div className="flex flex-col gap-5">
            <select
              id="areaAffected"
              className="select select-bordered w-full text-primary"
              defaultValue=""
              value={affectedArea}
              onChange={(event) => {
                setAffectedArea(event.target.value);
              }}
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {Object.entries(affectedAreas).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <p className="mb-3">Detalla tu incidencia</p>
            <PostEditor
              onPublishPost={handlePublishIncidence}
              isPublishing={sendingIncidence}
              placeholder="Escribe aquí tu incidencia..."
              buttonLabel="Enviar incidencia"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
