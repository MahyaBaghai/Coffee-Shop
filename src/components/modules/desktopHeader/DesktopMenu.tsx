import React from "react"
import DesktopSubMenu from "./DesktopSubMenu"
import { useNavigationStore } from "@/stores/navigationStore"
import { useTranslation } from "react-i18next"

const DesktopMenu: React.FC = () => {
  const { t } = useTranslation()
  const goToHome = useNavigationStore((s) => s.goToHome)
  const goToBlog = useNavigationStore((s) => s.goToBlog)
  const goToAbout = useNavigationStore((s) => s.goToAbout)
  const goToContact = useNavigationStore((s) => s.goToContact)

  return (
    <div className="flex gap-x-4 xl:gap-x-9 h-14">
      {/* Logo (click navigates home) */}
      <div onClick={goToHome} className="flex cursor-pointer shrink-0">
        <img src="/images/app-logo.png" alt="Golden Coffee" />
      </div>

       {/* Navigation links + submenu */}
      <div className="flex">
        <ul className="flex h-full items-center gap-x-5 xl:gap-x-9 text-gray-300 font-PoppinsRegular font-normal text-base lg:text-lg xl:text-xl [&_li]:leading-[56px] [&_li]:hover:cursor-pointer [&_li]:hover:text-orange-300">
          <li
            onClick={goToHome}
            className="font-medium text-orange-200 font-PoppinsMedium"
          >
            {t("Home")}
          </li>

          <li className="relative group">
            {t("Shop")}
            <DesktopSubMenu />
          </li>

          <li onClick={goToBlog}>{t("Blog")}</li>
          <li onClick={goToAbout}>{t("About")}</li>
          <li onClick={goToContact}>{t("Contact")}</li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopMenu
