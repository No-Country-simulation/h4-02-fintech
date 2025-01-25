/* import { ArrowRight } from "iconsax-react"; */
import recommendationImage from "../../../assets/images/recommendation.svg";
import { CardsRecommendation } from "../components/recommendation/CardsRecommendation";

export const RecommendationPage = () => {
  return (
    <div>
      <div>
        <CardsRecommendation />
      </div>
      {/* Illustration */}
      <div className="flex justify-center py-6">
        <img
          src={recommendationImage}
          alt="Recommendation modal illustration"
          width="200"
          height="200"
          className="object-cover"
        />
      </div>

      {/* Footer */}
      <div className="text-center space-y-4">
        <p className="text-lg font-medium">
          ¡Estás a un paso de alcanzar tus metas con estas inversiones!
        </p>
        {/* <button className="btn btn-primary max-w-sm w-full">
          Explorar todas las opciones
          <ArrowRight className="w-4 h-4 ml-2" />
        </button> */}
      </div>
    </div>
  );
};
