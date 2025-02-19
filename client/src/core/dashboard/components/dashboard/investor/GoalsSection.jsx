import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getGoals } from "../../../services/goals";
import { useGoalStore } from "../../../store/useGoalStore";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { Progress } from "../ui/Progress";
import CreateGoalModal from "./CreateGoalModal";
import {
  Airplane,
  Bag,
  Money,
  Home,
  Card,
  Setting,
  User,
  Folder,
  Flag,
} from "iconsax-react";
import { getErrorMessage } from "../../../../validators/errorHandler";
import EditGoalModal from "./EditGoalModal";
import { calculateRemainingTime } from "../../../../utils/calculateRemainingTime";

export const GoalsSection = () => {
  const { user } = useAuthStore();
  const { goals, setGoals, hasLoaded } = useGoalStore();

  const onHandleGoals = useCallback(async () => {
    try {
      if (!user?.id || hasLoaded) return;
      const newGoals = await getGoals(user.id);
      await setGoals(newGoals);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al cargar los objetivos", {
        description: errorMessage,
      });
      console.error("Error al cargar los objetivos", error);
    }
  }, [user.id, hasLoaded, setGoals]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    onHandleGoals();
  }, [onHandleGoals]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "vacaciones":
        return <Airplane size="24" className="text-primary" />;
      case "retiro":
        return <Money size="24" className="text-primary" />;
      case "bienes":
        return <Home size="24" className="text-primary" />;
      case "proyecto":
        return <Folder size="24" className="text-primary" />;
      case "otros":
        return <Bag size="24" className="text-primary" />;
      default:
        return <Airplane size="24" className="text-primary" />;
    }
  };

  if (!hasLoaded) {
    return (
      <div className="space-y-4">
        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="space-y-3 sm:border-2 sm:p-2 sm:rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <ul className="menu menu-horizontal bg-transparent rounded-box w-full">
              <li className="w-full">
                <details className="relative">
                  <summary className="flex">
                    <div className="w-11/12 space-y-1 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                      </div>
                    </div>
                    <div className="w-20 h-6 bg-gray-300 rounded-md"></div>
                  </summary>
                </details>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {goals
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((goal, index) => (
          <div
            key={index}
            className="flex flex-col justify-center space-y-3 bg-base-100 shadow-md p-2 sm:border-2 sm:p-2 rounded-xl sm:bg-transparent sm:shadow-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {getCategoryIcon(goal.category)}
                <h3 className="text-xl text-primary font-medium">
                  {goal.goalName}
                </h3>
              </div>
              <div>
                {goal.progress < 100 && <EditGoalModal goalId={goal.id} />}
              </div>
            </div>
            <ul className="menu menu-horizontal bg-transparent rounded-box w-full">
              <li className="w-full">
                <details className="relative">
                  <summary className="flex">
                    <div className="w-full space-y-1">
                      <div className="flex items-center">
                        <Progress
                          progress={goal.progress}
                          total={goal.desiredAmount}
                        />
                      </div>
                    </div>
                  </summary>
                  <ul className="z-20">
                    <li>
                      <details>
                        <summary>
                          <User size="16" /> Fecha límite
                        </summary>
                        <ul>
                          <li>
                            <a>
                              Próxima meta:{" "}
                              {new Date(goal.deadline).toLocaleDateString()}
                            </a>
                          </li>
                          <li>
                            <a>
                              {goal.progress < 100
                                ? `Tiempo restante: ${calculateRemainingTime(
                                    goal.deadline
                                  )}`
                                : "¡Objetivo alcanzado!"}
                            </a>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>
                          <Card size="16" /> Historial de aportes
                        </summary>
                        <ul>
                          {goal.contributions.map((contribution, idx) => (
                            <li key={idx}>
                              <a>
                                Aporte de {contribution.amount} en{" "}
                                {new Date(
                                  contribution.date
                                ).toLocaleDateString()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>

                    <li>
                      <details>
                        <summary>
                          <Setting size="16" /> Sugerencias
                        </summary>
                        <ul>
                          {/* {goal.suggestions.map((suggestion, idx) => (
                          <li key={idx}>
                            <a>{suggestion}</a>
                          </li>
                        ))} */}
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <p className="text-base font-semibold text-gray-600 mb-2">
              {goal.progress >= 0 && goal.progress < 25
                ? "¡Vamos por buen camino!"
                : goal.progress >= 25 && goal.progress < 50
                ? "¡Estamos en el camino correcto!"
                : goal.progress >= 50 && goal.progress < 75
                ? "¡Gran avance! Tu consistencia está dando frutos."
                : goal.progress >= 75 && goal.progress < 100
                ? "¡Estamos en el camino correcto!"
                : goal.progress === 100
                ? "¡Objetivo alcanzado!"
                : "¡Vamos por buen camino!"}
            </p>
          </div>
        ))}

      <div className="sm:border-2 sm:p-2 sm:rounded-xl sm:flex sm:flex-col sm:justify-center">
        <div className="hidden sm:flex sm:flex-col">
          <div className="flex items-center gap-2">
            <Flag size="24" className="text-primary" />
            <h3 className="text-xl font-medium text-primary mb-2">Objetivos</h3>
          </div>
          <p className="text-base text-gray-600">
            Transforma tus sueños en metas alcanzables. ¡Crea tu objetivo
          </p>
        </div>
        <CreateGoalModal />
      </div>
    </>
  );
};
