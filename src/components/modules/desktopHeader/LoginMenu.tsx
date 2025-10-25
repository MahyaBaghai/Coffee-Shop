import React from "react"
import ShopIcon from "@/components/modules/icons/ShopIcon"
import ArrowLeftEnd from "@/components/modules/icons/ArrowLeftEnd"
import MainCart from "../mainCart/MainCart"
import { ThemeToggleButton } from "@/components/modules/buttons/ThemeToggleButton "
import { useUIStore } from "@/stores/uiStore"
import LanguageSwitcher from "../language/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import Link from "next/link"

const LoginMenu: React.FC = () => {
  const { t } = useTranslation();
  const showNotification = useUIStore((s) => s.showNotification);
  const clearNotification = useUIStore((s) => s.clearNotification);

  return (
    <div className="flex items-center justify-between gap-x-3 xl:gap-x-5 text-orange-200">
      {/* Left icons: language, cart, theme toggle */}
      <div className="flex gap-x-3 xl:gap-x-4 items-center">
        <LanguageSwitcher />

        {/* Shopping cart with notification dot */}
        <div className="relative group">
          <div onMouseEnter={clearNotification} className="py-3 relative">
            <ShopIcon className="xl:w-8 xl:h-8 w-6 h-6 rotate-y-180 cursor-pointer" />
            {showNotification && (
              <span className="absolute top-1 -right-1">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>

          <div>
            <MainCart />
          </div>
        </div>

        <ThemeToggleButton />
      </div>

      <div className="border-[1px] h-14 text-white/20"></div>

      {/* Login/Register link */}
      <Link href={"/login"} className="flex gap-x-2.5 items-center hover:bg-orange-200/10 lg:hover:h-14 hover:rounded-4xl lg:hover:px-5 hover:h-10 hover:px-2 transition-all duration-300 ease-in-out cursor-pointer">
        <ArrowLeftEnd className="lg:hidden block w-6 h-6" />
        <div className="font-PoppinsRegular font-normal lg:text-lg xl:text-xl hidden lg:block">
          {t("Login")} | {t("Register")}
        </div>
      </Link>
    </div>
  );
};

export default LoginMenu;
