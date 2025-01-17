import { useState } from "react";
import { PieChartWithPaddingAngle } from "../ui/PieChartWithPaddingAngle";
import { Wallet } from "iconsax-react";

export const FinancialXModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    { name: "Ingresos", value: 500, percentage: 50 },
    { name: "Ahorros", value: 300, percentage: 30 },
    { name: "Gastos fijos", value: 160, percentage: 20 },
  ];

  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setIsOpen(true)}
      >
        Actualizar mi Radiografía
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

          <div className="space-y-6 mb-6 mt-3">
            <PieChartWithPaddingAngle data={data} />
          </div>

          <ul className="menu bg-transparent w-full space-y-4">
            {data.map((item, index) => (
              <li key={index}>
                <details className="border-2 rounded-[8px] p-2">
                  <summary>
                    <Wallet size="24" /> {item.name}
                  </summary>
                  <ul>
                    <li>
                      <a> ${item.value}</a>
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
