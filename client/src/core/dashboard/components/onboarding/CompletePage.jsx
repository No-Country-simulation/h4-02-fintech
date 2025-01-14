import { Book, Diagram, DollarCircle, Medal } from "iconsax-react";
import onboardingCompleteImage from "../../../../assets/images/onboarding-complete.svg";
import { useOnboardingStore } from "../../../auth/store/useOnboardingStore";
import { Link } from "react-router-dom";

export const CompletePage = () => {
  const { formData, setStep } = useOnboardingStore();
  const { knowledgeLevel, goals, riskPreference, savingsPercentage } = formData;

  const handleEdit = () => {
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-md w-full space-y-8">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            ¡Tu Perfil está listo!
          </h1>

          <div className="flex justify-center py-6">
            <img
              src={onboardingCompleteImage}
              alt="Profile completion illustration"
              width="300"
              height="300"
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white rounded border">
              <Book className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-semibold text-lg">
                  Nivel de Conocimientos
                </h2>
                <p className="text-gray-500 capitalize">{knowledgeLevel}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded border">
              <Medal className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-semibold text-lg">Objetivos</h2>
                {goals.map((goal) => (
                  <p key={goal} className="text-gray-500 capitalize">
                    {goal}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded border">
              <Diagram className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-semibold text-lg">
                  Preferencia de Riesgos
                </h2>
                <p className="text-gray-500 capitalize">{riskPreference}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded border">
              <DollarCircle className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-semibold text-lg">Capacidad de Ahorro</h2>
                <p className="text-gray-500 capitalize">
                  {savingsPercentage}% del ingreso mensual
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Link className="w-full btn btn-primary" to="/dashboard">
              Ir a mi Dashboard
            </Link>

            <button className="w-full btn btn-outline" onClick={handleEdit}>
              Editar Información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
