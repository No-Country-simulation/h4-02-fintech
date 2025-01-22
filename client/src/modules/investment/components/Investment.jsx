import { ArrowRight2, Setting4 } from "iconsax-react";
import { Link } from "react-router-dom";

export const Investment = () => {
  const menuItems = [
    {
      id: 1,
      title: "Acciones",
      description: "Partes en la que se divide el capital de una empresa.",
      link: "/dashboard/investment/actions",
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
      title: "CEDEARs",
      description:
        "Instrumento que representa acciones extranjeras en el mercado local.",
      link: "/dashboard/investment/cedears",
    },
    {
      id: 4,
      title: "Fondos",
      description:
        "Selección de activos con un objetivo financiero, administrados por profesionales.",
      link: "/dashboard/investment/funds",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-4 text-start">
        <button className="flex btn btn-ghost">
          <Setting4 size={24} /> Filtros
        </button>
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
