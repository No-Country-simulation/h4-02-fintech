import { Link } from "react-router-dom";
import { recommendationsData } from "../../utils/recommendation-data";

export const CardsRecommendation = () => {
  return (
    <div className="carousel w-full space-y-6 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendationsData.map((recommendation, index) => (
        <div
          key={index}
          id={`slide-${index}`}
          className="carousel-item w-full sm:flex sm:justify-center border"
        >
          <div className="max-w-md mx-auto bg-transparent rounded-xl shadow-sm">
            {/* Header with badge */}
            <div className="flex justify-end my-4 w-full">
              <span
                className={`badge badge-ghost font-medium ${
                  recommendation.type === "Conservador"
                    ? "bg-[#A3D9A5] text-black"
                    : recommendation.type === "Moderado"
                    ? "bg-[#FFE59D] text-black"
                    : "bg-[#FF8C42] text-black"
                }`}
              >
                {recommendation.type}
              </span>
            </div>

            {/* Fund details */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">{recommendation.title}</h2>
              <ul className="space-y-2">
                {recommendation.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-600">{detail.label}</span>
                    {detail.value && (
                      <span className="font-semibold ml-2">{detail.value}</span>
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
