import { useCallback, useEffect } from "react";
import { getRadiography } from "../services/radiography";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import radiographyImage from "../../../assets/images/radiography.svg";
import CreateRadiographyModal from "./CreateRadiographyModal";
import { useRadiographyStore } from "../store/radiograpy";
import { getErrorMessage } from "../../../core/validators/errorHandler";
import { toast } from "sonner";
import { formatCurrency } from "../../../core/utils/formatCurrency";
import { EvolutionFinance } from "./EvolutionFinance";

export const Radiography = () => {
  const { user } = useAuthStore();

  const { radiographyData, setRadiographyData, hasLoaded } =
    useRadiographyStore();

  const handleRadiography = useCallback(async () => {
    try {
      if (!user?.id || hasLoaded) return;
      const newRadiography = await getRadiography(user.id);
      await setRadiographyData(newRadiography);
    } catch (error) {
      await setRadiographyData(null);
      const errorMessage = getErrorMessage(error);
      
      if (!error.response.data.message.includes("Financial profile for")) {
        toast.error("Problemas al cargar la radiografía financiera", {
          description: errorMessage,
        });
      }

      console.error("Error al cargar la radiografía financiera", error);
    }
  }, [user.id, hasLoaded, setRadiographyData]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    handleRadiography();
  }, [handleRadiography]);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-semibold">Resumen financiero</h1>

      {!hasLoaded && <RadiographySkeleton />}

      {hasLoaded && radiographyData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-start p-2 mb-4">
            {radiographyData.total_balance?.ARG !== undefined && (
              <div className="card bg-base-100 shadow-md w-full">
                <div className="card-body flex-row flex-wrap items-center font-normal">
                  <h2 className="font-normal">Saldo total: </h2>
                  <p className="font-semibold">
                    {formatCurrency(radiographyData.total_balance.ARG) ||
                      "0,00"}
                  </p>
                </div>
              </div>
            )}

            {radiographyData.investments !== undefined && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body flex-row flex-wrap items-center font-normal">
                  <h2 className="font-normal">Inversiones actuales:</h2>
                  <p className="font-semibold">{radiographyData.investments}</p>
                </div>
              </div>
            )}

            {radiographyData.savings?.ARG !== undefined && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body flex-row flex-wrap items-center font-normal">
                  <h2 className="font-normal">Ahorros:</h2>
                  <p className="font-semibold">
                    {formatCurrency(radiographyData.savings.ARG) || "0,00"}
                  </p>
                </div>
              </div>
            )}

            {radiographyData.age_range !== undefined && (
              <div className="card bg-base-100 shadow-md">
                <div className="card-body flex-row flex-wrap items-center font-normal">
                  <h2 className="font-normal">Edad:</h2>
                  <p className="font-semibold">{radiographyData.age_range}</p>
                </div>
              </div>
            )}
          </div>
          <EvolutionFinance />
        </>
      ) : (
        hasLoaded && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-center py-6">
              <img
                src={radiographyImage}
                alt="Radiography init"
                width="130"
                height="120"
                className="object-cover"
              />
            </div>
            <p className="text-base text-center font-normal">
              Aún no hay datos para mostrar.{" "}
              <span className="font-semibold">Ingresa tu información</span> para
              ver tu análisis financiero personalizado.
            </p>
          </div>
        )
      )}
      {hasLoaded && <CreateRadiographyModal />}
    </div>
  );
};

const RadiographySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-start p-2 mb-4">
      <div className="card bg-base-100 shadow-md w-full">
        <div className="card-body flex-row flex-wrap items-center font-normal">
          <h2 className="font-normal bg-gray-200 h-6 w-24 animate-pulse"></h2>
          <p className="font-semibold bg-gray-200 h-6 w-16 animate-pulse ml-2"></p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex-row flex-wrap items-center font-normal">
          <h2 className="font-normal bg-gray-200 h-6 w-24 animate-pulse"></h2>
          <p className="font-semibold bg-gray-200 h-6 w-16 animate-pulse ml-2"></p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex-row flex-wrap items-center font-normal">
          <h2 className="font-normal bg-gray-200 h-6 w-24 animate-pulse"></h2>
          <p className="font-semibold bg-gray-200 h-6 w-16 animate-pulse ml-2"></p>
        </div>
      </div>
    </div>
  );
};
