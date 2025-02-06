import { ArrowLeft2, HambergerMenu, User, Warning2 } from "iconsax-react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import { Drawer } from "../ui/Drawer";

export const Navbar = ({ title }) => {
  const drawerItems = [
    {
      icon: <User size="24" />,
      text: "Usuarios y permisos",
      link: "/dashboard/admin/users",
    },
    {
      icon: <Warning2 size="24" />,
      text: "Incidencias técnicas",
      link: "/dashboard/admin/incidences",
    },
  ];

  return (
    <div className="bg-primary text-white p-1 lg:p-2 shadow-md">
      <div className="flex justify-between items-center mb-1 gap-2 pl-4">
        <div className="flex items-center gap-3">
          <Link className="p-2 -ml-2" to={"/dashboard/admin"}>
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
