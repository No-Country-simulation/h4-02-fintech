import { Airplane, Bag, Money, Home, Card, Setting, User } from "iconsax-react";
import CreateGoalModal from "./CreateGoalModal";
import { useGoalStore } from "../../../store/useGoalStore";
import { Progress } from "../ui/Progress";

export const GoalsSection = () => {
  const goals = useGoalStore((state) => state.goals);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "vacaciones":
        return <Airplane size="24" className="text-primary" />;
      case "retiro":
        return <Money size="24" className="text-primary" />;
      case "bienes":
        return <Home size="24" className="text-primary" />;
      case "otros":
        return <Bag size="24" className="text-primary" />;
      default:
        return <Airplane size="24" className="text-primary" />;
    }
  };

  return (
    <>
      {/* Goals */}
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
                          {goal.suggestions.map((suggestion, idx) => (
                            <li key={idx}>
                              <a>{suggestion}</a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
            <p className="text-base font-semibold text-gray-600 mb-4">
              {goal.message}
            </p>
          </div>
        ))}
      </>

      {/* Create Goal */}
      <CreateGoalModal />
    </>
  );
};
