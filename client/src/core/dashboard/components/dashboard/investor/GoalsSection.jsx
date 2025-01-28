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
import CreateContributionModal from "./CreateContributionModal";

export const GoalsSection = () => {
  const { user } = useAuthStore();
  const { goals, setGoals } = useGoalStore();

  const onHandleGoals = useCallback(async () => {
    try {
      if (!sessionStorage.getItem("token")) return;
      if (!user) return;
      const rep = await getGoals(user.id);
      if (rep) {
        setGoals(rep);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Problemas al cargar los objetivos", {
        description: errorMessage,
      });
      console.error("Error al cargar los objetivos", error);
    }
  }, [user, setGoals]);

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

  return (
    <>
      {goals
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((goal, index) => (
          <div
            key={index}
            className="space-y-3 sm:border-2 sm:p-2 sm:rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {getCategoryIcon(goal.category)}
                <h3 className="text-xl text-primary font-medium">
                  {goal.goalName}
                </h3>
              </div>
            </div>
            <ul className="menu menu-horizontal bg-transparent rounded-box w-full">
              <li className="w-full">
                <details>
                  <summary className="flex">
                    <div className="w-11/12 space-y-1 px-4">
                      <div className="flex items-center">
                        <Progress
                          progress={goal.progress}
                          total={goal.desiredAmount}
                        />
                      </div>
                    </div>
                    {goal.progress < 100 && (
                      <CreateContributionModal goal={goal} />
                    )}
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
                              Tiempo restante:{" "}
                              {Math.ceil(
                                (new Date(goal.deadline) - new Date()) /
                                  (1000 * 60 * 60 * 24 * 30)
                              )}{" "}
                              meses
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
