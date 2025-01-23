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
} from "iconsax-react";
import { getErrorMessage } from "../../../../validators/errorHandler";

export const GoalsSection = () => {
  const { user } = useAuthStore();
  const { goals, setGoals } = useGoalStore();

  const onHandleGoals = useCallback(async () => {
    try {
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
      {goals.map((goal, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-2">
            {getCategoryIcon(goal.category)}
            <h3 className="text-xl font-medium text-gray-800">
              {goal.goalName}
            </h3>
          </div>
          <ul className="menu menu-horizontal bg-base-200 rounded-box w-full">
            <li className="w-full">
              <details>
                <summary className="flex">
                  <div className="w-full space-y-2">
                    <div className="flex items-center">
                      <Progress progress={goal.progress} />
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
                              {new Date(contribution.date).toLocaleDateString()}
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
          <p className="text-base font-semibold text-gray-600 mb-4">
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
      <CreateGoalModal />
    </>
  );
};
