import { useCallback, useEffect, useState } from "react";
import { DollarCircle, ShoppingBag } from "iconsax-react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { useFinancialStore } from "../../../store/useFinancialStore";
import { Link } from "react-router-dom";
import { getFinancial } from "../../../services/financial";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { getErrorMessage } from "../../../../validators/errorHandler";
import { toast } from "sonner";

export const SavingsOverview = () => {
  const [progressValue, setProgressValue] = useState(0);
  const { user } = useAuthStore();
  const { financial, hasLoaded, updateFinancialData, currencyType, show } =
    useFinancialStore();

  const onHandleFinances = useCallback(async () => {
    try {
      if (!user?.id || hasLoaded) return;
      const finances = await getFinancial(user.id);
      await updateFinancialData(finances);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Error cargando las finanzas personales", {
        description: errorMessage,
      });
      console.error("Error cargando las finanzas personales", error);
    }
  }, [user?.id, hasLoaded, updateFinancialData]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    onHandleFinances();
  }, [onHandleFinances]);

  useEffect(() => {
    if (!financial?.savings?.percentage) return;
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= Number(financial.savings.percentage)) {
          clearInterval(interval);
          return Number(financial.savings.percentage);
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [financial.savings.percentage]);

  return (
    <Link
      className="flex w-full items-center justify-center p-2 bg-base-200 border-1 rounded-xl shadow-md hover:shadow-lg"
      to={"/dashboard/transactions"}
    >
      <div className="flex flex-col items-center gap-2 lg:w-auto p-2 ">
        <div
          className="w-20 h-20 bg-gray-300 text-primary rounded-full flex items-center justify-center radial-progress"
          style={{
            "--value": progressValue,
            "--size": "5rem",
            "--thickness": "0.4rem",
          }}
          role="progressbar"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 39 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.5299 17.9278C28.0685 17.9278 28.52 17.7456 28.8844 17.3812C29.2488 17.0168 29.431 16.5653 29.431 16.0266C29.431 15.488 29.2488 15.0364 28.8844 14.672C28.52 14.3076 28.0685 14.1255 27.5299 14.1255C26.9912 14.1255 26.5397 14.3076 26.1753 14.672C25.8109 15.0364 25.6287 15.488 25.6287 16.0266C25.6287 16.5653 25.8109 17.0168 26.1753 17.3812C26.5397 17.7456 26.9912 17.9278 27.5299 17.9278ZM12.3206 14.1255H21.8264V10.3231H12.3206V14.1255ZM5.66648 36.9394C4.58916 33.3272 3.52767 29.7229 2.48203 26.1265C1.43639 22.5302 0.913574 18.8467 0.913574 15.076C0.913574 12.1609 1.92753 9.68941 3.95543 7.6615C5.98334 5.63359 8.45485 4.61964 11.37 4.61964H20.8758C21.7947 3.41557 22.9116 2.48083 24.2266 1.81542C25.5416 1.15002 26.9595 0.817314 28.4804 0.817314C29.2726 0.817314 29.9459 1.09457 30.5004 1.64907C31.0549 2.20358 31.3322 2.87691 31.3322 3.66906C31.3322 3.82749 31.253 4.19188 31.0945 4.76223C30.9678 5.11077 30.849 5.46724 30.7381 5.83163C30.6272 6.19602 30.54 6.56833 30.4767 6.94856L34.8018 11.2737H38.9368V24.5343L33.566 26.2929L30.3816 36.9394H19.9252V33.1371H16.1229V36.9394H5.66648Z"
              fill="#004AAD"
            />
          </svg>
        </div>

        <span className="text-base font-bold">Ahorros</span>
      </div>

      <div className="divider divider-horizontal divider-primary"></div>

      <div className="flex-1 w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <DollarCircle size="36" className="text-primary" />
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="text-base font-semibold">Ingresos</span>
              {hasLoaded ? (
                <span className="font-bold text-sm text-primary">
                  {show
                    ? (financial.income.values[currencyType] === 0 ? "0,00" : formatCurrency(financial.income.values[currencyType], currencyType, 2))
                    : (financial.income.values[currencyType] === 0 ? "0,00" : formatCurrency(financial.income.values[currencyType], currencyType, 2).replace(/\d/g, "x"))
                  }
                </span>
              ) : (
                <span className="loading loading-dots loading-md text-secondary"></span>
              )}
            </div>
          </div>
        </div>

        <div className="divider divider-primary m-0"></div>

        <div className="flex items-center gap-2">
          <ShoppingBag size="36" className="text-primary" />
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="text-base font-semibold">Gastos</span>
              {hasLoaded ? (
                <span className="font-bold text-sm text-primary">
                  -
                  {show
                    ? (financial.fixedExpenses.values[currencyType] === 0 ? "0,00" : formatCurrency(financial.fixedExpenses.values[currencyType], currencyType, 2))
                    : (financial.fixedExpenses.values[currencyType] === 0 ? "0,00" : formatCurrency(financial.fixedExpenses.values[currencyType], currencyType, 2).replace(/\d/g, "x"))
                  }
                </span>
              ) : (
                <span className="loading loading-dots loading-md text-primary"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
