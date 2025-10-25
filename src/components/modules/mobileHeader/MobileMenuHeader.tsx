import React from "react"
import Logo from "@/components/modules/icons/Logo"
import LogoType from "@/components/modules/icons/LogoType"
import { HiXMark } from "react-icons/hi2"
import { useUIStore } from "@/stores/uiStore"
import { useNavigationStore } from "@/stores/navigationStore"

const MobileMenuHeader : React.FC = () => {
  const closeMenuInMobile = useUIStore((s) => s.closeMenuInMobile)
  const goToHome = useNavigationStore((s) => s.goToHome)

  return (
    <div className="flex justify-between items-center py-3 mx-4 border-b-[1px] border-gray-100 dark:border-white/10">
      {/* Logo (click navigates home) */}
      <div
        onClick={goToHome}
        className="flex gap-x-2 w-30 h-10 [&>*]:text-orange-300 cursor-pointer"
      >
        <Logo />
        <LogoType />
      </div>
      {/* Close icon */}
      <HiXMark
        onClick={closeMenuInMobile}
        className="w-5 h-5 shrink-0 transition-all duration-300 cursor-pointer text-zinc-600 dark:text-white"
      />
    </div>
  );
};

export default MobileMenuHeader 
