import { ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { FilterModal } from "../filters/FilterModal";

export const Investment = () => {
  const menuItems = [
    {
      id: 1,
      title: "FOREX",
      description:
        "Mercado de divisas en el que se intercambian monedas extranjeras.",
      link: "/dashboard/investment/forex",
    },
    {
      id: 2,
      title: "Bonos",
      description:
        "Deuda que puede emitir tanto el Estado como las empresas para financiarse.",
      link: "/dashboard/investment/bonds",
    },
    {
      id: 3,
      title: "ETFs",
      description:
        "Fondos cotizados que agrupan activos como acciones, bonos, etc.",
      link: "/dashboard/investment/etfs",
    },
    {
      id: 4,
      title: "COMMODITIES",
      description:
        "Materias primas como petróleo, oro, o productos agrícolas que se comercian en el mercado.",
      link: "/dashboard/investment/commodities",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-4 text-start">
        <FilterModal />
      </div>

      {/* Menu Items */}
      <div className="grid gap-4 sm:grid-cols-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="card bg-white shadow hover:shadow-lg transition-shadow cursor-pointer rounded-none"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ArrowRight2 size={24} className="text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
