import { Navbar } from "../../../core/dashboard/components/dashboard/ui/Navbar";
import { ProfileInvestor } from "../components/ProfileInvestor";

export const ProfileInvestorPage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar title="Mi Perfil" />
      <ProfileInvestor />
    </div>
  );
};
