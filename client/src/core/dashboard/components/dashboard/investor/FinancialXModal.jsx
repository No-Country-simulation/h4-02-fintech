import { useState } from "react";
import { PieChartWithPaddingAngle } from "../ui/PieChartWithPaddingAngle";
import { Wallet } from "iconsax-react";

import { formatCurrency } from "../../../../utils/formatCurrency";
import { useFinancialStore } from "../../../store/useFinancialStore";

export const FinancialXModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { financial } = useFinancialStore();
  const data = [
    {
      name: "Ingresos",
      values: financial?.income.values,
      percentage: financial?.income.percentage,
    },
    {
      name: "Ahorros",
      values: financial?.savings.values,
      percentage: financial?.savings.percentage,
    },
    {
      name: "Gastos Fijos",
      values: financial?.fixedExpenses.values,
      percentage: financial?.fixedExpenses.percentage,
    },
  ];

  const hasData = data.some(
    (item) => item.values.ARG > 0 || item.values.USD > 0
  );

  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setIsOpen(true)}
      >
        Mi radiografía
      </button>

      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-box relative bg-white max-w-md p-6 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-ghost absolute right-2 top-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          {hasData && (
            <div className="space-y-6 mb-6 mt-3">
              <PieChartWithPaddingAngle data={data} />
            </div>
          )}

          <ul className="menu bg-transparent w-full space-y-4 mt-4">
            {data.map((item, index) => (
              <li key={index}>
                <details className="border-2 rounded-[8px] p-2">
                  <summary className="text-primary font-bold">
                    <Wallet size="24" className="text-secondary" /> {item.name}
                  </summary>
                  <ul>
                    <li>
                      <a>
                        {item.values.ARG == 0
                          ? "$ 0,00"
                          : formatCurrency(item.values.ARG, "ARG", 2)}
                      </a>
                    </li>
                    <li>
                      <a>
                        {item.values.USD == 0
                          ? "US$ 0,00"
                          : formatCurrency(item.values.USD, "USD", 2)}
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};
