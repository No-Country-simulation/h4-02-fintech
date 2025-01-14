import { WelcomePage } from "../components/onboarding/WelcomePage";
import { AboutYouPage } from "../components/onboarding/AboutYouPage";
import { GoalsPage } from "../components/onboarding/GoalsPage";
import { InvestmentStylePage } from "../components/onboarding/InvestmentStylePage";
import { CurrentNumbersPage } from "../components/onboarding/CurrentNumbersPage";
import { CompletePage } from "../components/onboarding/CompletePage";
import { useOnboardingStore } from "../../auth/store/useOnboardingStore";

export const OnboardingPage = () => {
  const { step, nextStep, prevStep } = useOnboardingStore();

  return (
    <div>
      {step === 1 && <WelcomePage nextStep={nextStep} />}
      {step === 2 && <AboutYouPage nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <GoalsPage nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && (
        <InvestmentStylePage nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 5 && (
        <CurrentNumbersPage nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 6 && <CompletePage />}
    </div>
  );
};
