import { HambergerMenu, User, Warning2 } from "iconsax-react";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { useOnboardingStore } from "../../../../auth/store/useOnboardingStore";

import { validateComplete } from "../../../../validators/complete";

import OnboardingModal from "../../onboarding/OnboardingModal";
import { Drawer } from "../ui/Drawer";

export const Header = () => {
  const { user } = useAuthStore();
  const { formData } = useOnboardingStore();
  const formDataComplete = validateComplete(formData);

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
    <div className="bg-primary text-white p-4 md:p-6 lg:p-8 rounded-b-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full ring ring-primary">
              {user?.picture ? (
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold text-gray-700">
                  {user?.name?.[0]?.toUpperCase() || ""}
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Bienvenido!</p>
            <h2 className="text-xl font-semibold">
              {user?.name?.split(" ")[0] ?? ""}
            </h2>
          </div>
        </div>
        <div className="flex gap-0 sm:gap-2 mt-4 md:mt-0">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-circle drawer-button"
          >
            <HambergerMenu size="24" />
          </label>
        </div>
      </div>

      <Drawer menu={drawerItems} />
      {!formDataComplete && <OnboardingModal />}
    </div>
  );
};
