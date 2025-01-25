import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import {
  ArrowLeft2,
  Edit,
  HambergerMenu,
  MessageQuestion,
  MoneyRecive,
  Profile,
  Profile2User,
} from "iconsax-react";
import { Drawer } from "./Drawer";
import { validateComplete } from "../../../../validators/complete";
import { useOnboardingStore } from "../../../../auth/store/useOnboardingStore";

export const Navbar = ({ title }) => {
  const { formData } = useOnboardingStore();
  const formDataComplete = validateComplete(formData);

  const drawerItems = [
    {
      icon: <Profile size="24" />,
      text: "Mi Perfil",
      link: "/dashboard/profile",
    },
    {
      icon: <MoneyRecive size="24" />,
      text: "Gestión de inversiones",
      link: "/dashboard/investment",
    },
    {
      icon: <Edit size="24" />,
      text: !formDataComplete
        ? "Terminar mi onboarding"
        : "Editar mi onboarding",
      link: "/dashboard/onboarding",
    },
    {
      icon: <Profile2User size="24" />,
      text: "Foro y comunidad",
      link: "/",
    },
    {
      icon: <MessageQuestion size="24" />,
      text: "Ayuda y soporte técnico",
      link: "/",
    },
  ];

  return (
    <div className="bg-primary text-white p-1 lg:p-2 shadow-md">
      <div className="flex justify-between items-center mb-1 gap-2 pl-4">
        <div className="flex items-center gap-3">
          <Link className="p-2 -ml-2" to={"/dashboard"}>
            <ArrowLeft2 className="w-6 h-6" />
          </Link>
          <h2>
            <span className="text-lg font-semibold opacity-80">{title}</span>
          </h2>
        </div>
        <div className="flex items-center gap-0 sm:gap-2">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-circle drawer-button"
          >
            <HambergerMenu size="24" />
          </label>
        </div>
      </div>
      <Drawer menu={drawerItems} />
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};
