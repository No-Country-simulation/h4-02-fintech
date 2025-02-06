import { Navbar } from "../../../core/dashboard/components/dashboard/investor/Navbar";
import { Radiography } from "../components/Radiography";

export const RadiographyFinancialPage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar title="Tu radiografía financiera" />
      <Radiography />
    </div>
  );
};
