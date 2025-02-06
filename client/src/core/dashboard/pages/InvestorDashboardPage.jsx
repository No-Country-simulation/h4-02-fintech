import { Navigate } from "react-router-dom";
import { FinancialSection } from "../components/dashboard/investor/FinancialSection";
import { GoalsSection } from "../components/dashboard/investor/GoalsSection";
import { Header } from "../components/dashboard/investor/Header";
import { InvestmentSection } from "../components/dashboard/investor/InvestmentSection";
/* import { OperationsSection } from "../components/dashboard/investor/OperationsSection"; */
import { SavingsOverview } from "../components/dashboard/investor/SavingsOverview";
import { useOnboardingStore } from "../../auth/store/useOnboardingStore";
import { useFinancialStore } from "../store/useFinancialStore";
/* import dashboardDesktopImage from "../../../assets/images/dashboard-desktop.svg"; */
import Footer from "../components/dashboard/ui/Footer";
import { TransactionSection } from "../components/dashboard/investor/TransactionSection";
import { Balance } from "../components/dashboard/investor/Balance";

export const InvestorDashboardPage = () => {
  const { isFirstSet } = useOnboardingStore();
  const { financial } = useFinancialStore();

  if (isFirstSet) {
    return <Navigate to="/dashboard/onboarding" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:mb-24">
        {financial && <Balance />}
        {financial && <SavingsOverview />}
        <div className="md:col-span-2">
          <TransactionSection />
        </div>
        <GoalsSection />
        <FinancialSection />
        <InvestmentSection />
        {/* <OperationsSection /> */}
       {/*  <div className="hidden sm:flex">
          <img
            src={dashboardDesktopImage}
            alt="dashboard image"
            className="w-full"
          />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};
