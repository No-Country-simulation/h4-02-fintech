import { Navbar } from "../../../core/dashboard/components/dashboard/investor/Navbar";
import { Transaction } from "../components/Transaction";

export const TransactionsPage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar title="Ingresos y egresos" />
      <Transaction />
    </div>
  );
};
