import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecommendations } from "../../services/recommendation";
import { getErrorMessage } from "../../../../core/validators/errorHandler";
import { toast } from "sonner";
import { useOnboardingStore } from "../../../../core/auth/store/useOnboardingStore";

export const CardsRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formData } = useOnboardingStore();

  const onHandleRecommendations = async () => {
    try {
      const newRecommendations = await getRecommendations();

      const mappedRecommendations = newRecommendations.map((symbol) => ({
        type: formData.riskPreference.toLowerCase(),
        title: symbol,
        details: [
          {
            label: "Riesgo:",
            value:
              formData.riskPreference.toLowerCase().toLowerCase() ===
              "conservador"
                ? "Bajo"
                : "Medio",
          },
        ],
        instrument: symbol,
        id: `${symbol}`,
      }));

      setRecommendations(mappedRecommendations);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onHandleRecommendations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="carousel w-full sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? // Skeleton loader
          Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-transparent rounded-xl shadow-sm animate-pulse border p-4"
            >
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          ))
        : recommendations.map((recommendation, index) => (
            <div
              key={index}
              id={`slide-${index}`}
              className="carousel-item w-full sm:flex sm:justify-center border"
            >
              <div className="max-w-md mx-auto bg-transparent rounded-xl shadow-sm">
                {/* Header with badge */}
                <div className="flex justify-end my-4 w-full">
                  <span
                    className={`badge badge-ghost font-medium capitalize ${
                      recommendation.type === "conservador"
                        ? "bg-[#A3D9A5] text-black"
                        : recommendation.type === "moderado"
                        ? "bg-[#FFE59D] text-black"
                        : "bg-[#FF8C42] text-black"
                    }`}
                  >
                    {recommendation.type}
                  </span>
                </div>

                {/* Fund details */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">
                    {recommendation.title}
                  </h2>
                  <ul className="space-y-2">
                    {recommendation.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gray-600">{detail.label}</span>
                        {detail.value && (
                          <span className="font-semibold ml-2">
                            {detail.value}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <Link
                  className="btn btn-primary w-full mb-8"
                  to={`/dashboard/investment/instrument/${recommendation.instrument}/${recommendation.id}`}
                >
                  Ver más detalles
                </Link>
              </div>
            </div>
          ))}
    </div>
  );
};
