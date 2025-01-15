import { Navigate } from "react-router-dom";
import { FinancialSection } from "../components/dashboard/investor/FinancialSection";
import { GoalsSection } from "../components/dashboard/investor/GoalsSection";
import { Header } from "../components/dashboard/investor/Header";
import { InvestmentSection } from "../components/dashboard/investor/InvestmentSection";
import { OperationsSection } from "../components/dashboard/investor/OperationsSection";
import { SavingsOverview } from "../components/dashboard/investor/SavingsOverview";
import { useOnboardingStore } from "../../auth/store/useOnboardingStore";

export const InvestorDashboardPage = () => {
  const { isFirstSet } = useOnboardingStore();

   if (isFirstSet) {
    return <Navigate to="/dashboard/onboarding" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <SavingsOverview />
        <GoalsSection />
        <FinancialSection />
        <InvestmentSection />
        <OperationsSection />
      </div>
    </div>
  );
};
