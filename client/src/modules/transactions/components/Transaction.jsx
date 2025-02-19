import { useFinancialStore } from "../../../core/dashboard/store/useFinancialStore";
import { formatCurrency } from "../../../core/utils/formatCurrency";
import CreateTransactionModal from "./CreateTransactionModal";

export const Transaction = () => {
  const { financial, currencyType, hasLoaded } = useFinancialStore();

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-50">
      {/* Balance Card */}
      <div className="card bg-base-100 shadow-md mb-6 rounded-3xl p-4">
        <div className="card-body p-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-sm opacity-70">Ingresos Total</p>
              {hasLoaded ? (
                <p className="sm:text-md text-sm font-bold break-all">
                  {financial.income.values[currencyType] == 0
                    ? "0,00"
                    : formatCurrency(
                      financial.income.values[currencyType],
                      currencyType,
                      2
                    )}
                </p>
              ) : (
                <span className="loading loading-dots loading-md text-secondary"></span>
              )}
            </div>
            <div className="divider divider-horizontal divider-primary"></div>
            <div className="text-right">
              <p className="text-sm opacity-70">Gastos Total</p>
              {hasLoaded ? (
                <p className="sm:text-md text-sm font-bold break-all">

                  {financial.fixedExpenses.values[currencyType] == 0
                    ? "- 0,00"
                    : "-" + formatCurrency(
                      financial.fixedExpenses.values[currencyType],
                      currencyType,
                      2
                    )}
                </p>
              ) : (
                <span className="loading loading-dots loading-md text-secondary"></span>
              )}
            </div>
          </div>

          <div className="w-full relative">
            <progress
              className="progress progress-primary w-full h-8 bg-slate-300"
              value={hasLoaded ? financial.savings.percentage : 0}
              max="100"
            ></progress>
            <div className="absolute inset-0 flex items-center justify-between text-xs text-white font-bold px-2">
              {hasLoaded ? (
                <>
                  <span>{financial.savings.percentage}%</span>
                  <span className="break-all text-gray-800">
                    {formatCurrency(
                      financial.savings.values[currencyType],
                      currencyType,
                      2
                    )}
                  </span>
                </>
              ) : (
                <span className="loading loading-dots loading-md text-secondary"></span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked="checked"
              className="checkbox checkbox-sm"
              disabled
            />
            <p className="text-sm opacity-70">
              {hasLoaded ? (
                `El ${financial.savings.percentage}% son ahorros, se ve bien.`
              ) : (
                <span className="loading loading-dots loading-md text-secondary"></span>
              )}
            </p>
          </div>
        </div>
      </div>

      <CreateTransactionModal />
    </div>
  );
};
