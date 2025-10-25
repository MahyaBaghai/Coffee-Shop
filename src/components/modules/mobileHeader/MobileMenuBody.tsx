import React, { useState } from "react"
import { HiOutlineHome } from "react-icons/hi"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { HiOutlineBriefcase } from "react-icons/hi2"
import { HiOutlineDocumentText } from "react-icons/hi2"
import { FiPhoneOutgoing } from "react-icons/fi"
import SubMenu from "./MobileSubMenu"
import { useNavigationStore } from "@/stores/navigationStore"
import { useTranslation } from 'react-i18next'

const MobileMenuBody: React.FC = () => {
  const { t } = useTranslation();
  const goToHome = useNavigationStore((s) => s.goToHome)
  const goToBlog = useNavigationStore((s) => s.goToBlog)
  const goToAbout = useNavigationStore((s) => s.goToAbout)
  const goToContact = useNavigationStore((s) => s.goToContact)

  const [openSubMenu, setOpenSubMenu] = useState(false)
  const toggleSubMenu = () => setOpenSubMenu((prev) => !prev)

  return (
    <>
      {/* Home button */}
      <div
        onClick={goToHome}
        className="flex items-center gap-x-2 pl-2.5 h-10 mx-4 mt-6 mb-4 rounded-md text-orange-300 bg-orange-200/20"
      >
        <HiOutlineHome className="w-5 h-5 cursor-pointer" />
        <span className="cursor-pointer">{t('Home')}</span>
      </div>

      {/* Menu list */}
      <ul
        className={`
          mx-6.5 space-y-6 pb-6 border-b-[1px]
          [&_*]:flex [&_*]:gap-x-2 [&>li]:cursor-pointer
          [&>*]:active:text-orange-300 [&_*]:active:transition-all
          border-gray-100 [&>*]:text-zinc-700 dark:border-white/10 dark:[&>*]:text-white
        `}
      >
        {/* Shop with submenu */}
        <li className="flex-col">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              openSubMenu ? "text-orange-300" : ""
            }`}
            onClick={toggleSubMenu}
          >
            <div>
              <HiOutlineShoppingBag className="w-5 h-5" />
              <div>{t('Shop')}</div>
            </div>
            <MdOutlineKeyboardArrowDown />
          </div>

          {openSubMenu && <SubMenu />}
        </li>

        {/* Club */}
        <li onClick={goToBlog}>
          <HiOutlineBriefcase className="w-5 h-5" />
          <span>{t('Blog')}</span>
        </li>

        {/* About */}
        <li onClick={goToAbout}>
          <HiOutlineDocumentText className="w-5 h-5" />
          <span>{t('About')}</span>
        </li>

        {/* Contact */}
        <li onClick={goToContact}>
          <FiPhoneOutgoing className="w-4.5 h-4.5" />
          <span>{t('Contact')}</span>
        </li>
      </ul>
    </>
  );
};

export default MobileMenuBody
