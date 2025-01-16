import { PropTypes } from "prop-types";
import { ArrowRight2, Home, Logout } from "iconsax-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../auth/store/useAuthStore";

export const Drawer = ({ menu }) => {
  const { logout } = useAuthStore();
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-0">
          <div className="flex justify-between items-center p-2">
            <Link
              className="btn btn-ghost flex items-center gap-2 px-2 w-fit"
              to={"/"}
            >
              <Home size="24" />
              <span className="text-xl font-semibold text-navy-900">
                Ir a Inicio
              </span>
            </Link>
            <label
              htmlFor="my-drawer"
              className="btn btn-square cursor-pointer text-3xl font-base"
              aria-label="Cerrar menú"
            >
              x
            </label>
          </div>

          <div className="space-y-1">
            {menu.map((item) => (
              <div key={item.text}>
                <Link
                  className="w-full flex items-center justify-between px-4 py-2 text-left btn btn-ghost rounded-lg group"
                  to={item.link}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-lg font-semibold ">{item.text}</span>
                  </div>
                  <ArrowRight2 size="20" />
                </Link>
                <div className="divider divider-primary m-0 px-4"></div>
              </div>
            ))}
          </div>

          <div className="px-4 mb-4">
            <button onClick={logout} className="w-full mt-2 btn btn-primary">
              <Logout size="24" />
              Cerrar sesión
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  menu: PropTypes.array,
};
