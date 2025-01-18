import {
  Eye,
  EyeSlash,
  HambergerMenu,
  Profile,
  Edit,
  MoneyRecive,
  Profile2User,
  MessageQuestion,
} from "iconsax-react";
import { useAuthStore } from "../../../../auth/store/useAuthStore";
import { useState } from "react";
import { Drawer } from "../ui/Drawer";
import NotificationsModal from "../../../../notifications/components/NotificationsModal";
import { useFinancialStore } from "../../../store/useFinancialStore";
import { formatCurrency } from "../../../../utils/formatCurrency";

export const Header = () => {
  const { user } = useAuthStore();
  const { financial, toggleCurrencyType, currencyType } = useFinancialStore();

  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleCurrencyChange = () => {
    toggleCurrencyType();
  };

  const drawerItems = [
    {
      icon: <Profile size="24" />,
      text: "Mi Perfil",
      link: "/dashboard/profile",
    },
    {
      icon: <MoneyRecive size="24" />,
      text: "Gestión de inversiones",
      link: "/",
    },
    {
      icon: <Edit size="24" />,
      text: "Terminar mi onboarding",
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
    <div className="bg-primary text-white p-4 md:p-6 lg:p-8 rounded-b-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full ring ring-primary">
              <span className="text-3xl">{user?.name[0]}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Bienvenido!</p>
            <h2 className="text-xl font-semibold">
              {user?.name.split(" ")[0]}
            </h2>
          </div>
        </div>
        <div className="flex gap-0 sm:gap-2 mt-4 md:mt-0">
          <NotificationsModal />
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-circle drawer-button"
          >
            <HambergerMenu size="24" />
          </label>
        </div>
      </div>

      {financial && (
        <div>
          <p className="text-gray-400 text-sm">Balance</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start">
              <h1 className="text-3xl font-bold">
                {showBalance
                  ? formatCurrency(
                      financial.balance.values[currencyType],
                      currencyType
                    )
                  : formatCurrency(
                      financial.balance.values[currencyType],
                      currencyType
                    ).replace(/\d/g, "x") || "0"}
              </h1>
              <select
                className="select select-sm bg-transparent border-0 mx-2 my-2"
                value={currencyType}
                onChange={handleCurrencyChange}
              >
                <option value="ARS" className="text-black">
                  ARS
                </option>
                <option value="USD" className="text-black">
                  USD
                </option>
              </select>
            </div>

            <button
              className="btn btn-ghost btn-circle mt-4 md:mt-0"
              onClick={toggleBalanceVisibility}
            >
              {showBalance ? (
                <Eye size="24" className="text-white" />
              ) : (
                <EyeSlash size="24" className="text-white" />
              )}
            </button>
          </div>
        </div>
      )}

      <Drawer menu={drawerItems} />
    </div>
  );
};
