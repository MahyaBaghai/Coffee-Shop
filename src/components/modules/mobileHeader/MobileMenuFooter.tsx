import React from "react";
import ArrowLeftEnd from "@/components/modules/icons/ArrowLeftEnd";
import ShopIcon from "@/components/modules/icons/ShopIcon";
import { ThemeToggleButton } from "@/components/modules/buttons/ThemeToggleButton ";
import { useUIStore } from "@/stores/uiStore";
import LanguageSwitcher from "../language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const MobileMenuFooter: React.FC = () => {
  const { t } = useTranslation();
  const closeMenuInMobile = useUIStore((s) => s.closeMenuInMobile);
  const openShoppingCartInMobile = useUIStore(
    (s) => s.openShoppingCartInMobile
  );

  const goToCart = () => {
    closeMenuInMobile();
    openShoppingCartInMobile();
  };

  return (
    <ul
      className={`
        flex flex-col items-start mx-6.5 mt-7
        [&_li]:inline-flex [&_*]:cursor-pointer [&_*]:gap-x-2
        [&_*]:text-orange-300 [&_*]:active:[&_*]:transition-all
        [&_*]:active:[&_*]:text-zinc-600 dark:[&_*]:active:[&_*]:text-gray-100
      `}
    >
      {/* Login/Register */}
      <li className="mb-6" onClick={closeMenuInMobile}>
        <Link href="/login" className="inline-flex items-center gap-x-2">
          <ArrowLeftEnd className="w-6 h-6 rotate-y-180" />
          <span>
            {t("Login")} | {t("Register")}
          </span>
        </Link>
      </li>

      {/* Theme toggle */}
      <li className="transition-all duration-300 ease-in-out mb-4">
        <ThemeToggleButton />
      </li>

      {/* Shopping Cart */}
      <li onClick={goToCart} className="mb-6">
        <ShopIcon className="w-6 h-6" />
        <span>{t("ShoppingCart")}</span>
      </li>

      {/* Language Switcher */}
      <LanguageSwitcher />
    </ul>
  );
};

export default MobileMenuFooter;
