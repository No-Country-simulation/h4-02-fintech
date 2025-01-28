import { Navigate } from "react-router-dom";
import { FinancialSection } from "../components/dashboard/investor/FinancialSection";
import { GoalsSection } from "../components/dashboard/investor/GoalsSection";
import { Header } from "../components/dashboard/investor/Header";
import { InvestmentSection } from "../components/dashboard/investor/InvestmentSection";
/* import { OperationsSection } from "../components/dashboard/investor/OperationsSection"; */
import { SavingsOverview } from "../components/dashboard/investor/SavingsOverview";
import { useOnboardingStore } from "../../auth/store/useOnboardingStore";
import { useFinancialStore } from "../store/useFinancialStore";
import dashboardDesktopImage from "../../../assets/images/dashboard-desktop.svg";
import Footer from "../components/dashboard/ui/Footer";

export const InvestorDashboardPage = () => {
  const { isFirstSet } = useOnboardingStore();
  const { financial } = useFinancialStore();

  if (isFirstSet) {
    return <Navigate to="/dashboard/onboarding" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 p-4">
        {financial && <SavingsOverview />}
        <GoalsSection />
        <FinancialSection />
        <InvestmentSection />
        {/* <OperationsSection /> */}
        <div className="hidden sm:flex">
          <img
            src={dashboardDesktopImage}
            alt="dashboard image"
            className="w-full"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
