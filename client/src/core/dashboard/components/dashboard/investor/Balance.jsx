import { useFinancialStore } from "../../../store/useFinancialStore";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { Eye, EyeSlash } from "iconsax-react";

export const Balance = () => {
    const { financial, toggleCurrencyType, currencyType, show, toggleShow } = useFinancialStore();

    const toggleBalanceVisibility = () => {
        toggleShow();
    };

    const handleCurrencyChange = () => {
        toggleCurrencyType();
    };

    const formattedBalance = formatCurrency(
        financial.balance.values[currencyType],
        currencyType,
        2
    );

    return (
        financial && (
            <div className="sm:block hidden bg-base-100 p-4 border-2 rounded-xl shadow-md">
                <p className="text-primary/75 text-sm">Balance</p>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <h1 className="text-2xl text-primary font-bold">
                            {show ? formattedBalance : formattedBalance.replace(/\d/g, "x") || "0,00"}
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
                        {show ? (
                            <Eye size="24" className="text-primary" />
                        ) : (
                            <EyeSlash size="24" className="text-primary" />
                        )}
                    </button>
                </div>
            </div>
        )
    )
}
