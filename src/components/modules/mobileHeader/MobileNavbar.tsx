import React from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import LogoType from "@/components/modules/icons/LogoType"
import ShopIcon from "@/components/modules/icons/ShopIcon"
import { useUIStore } from "@/stores/uiStore"
import { useNavigationStore } from "@/stores/navigationStore"

const Navbar: React.FC= () => {
  const goToHome = useNavigationStore((s) => s.goToHome)

  const openMenuInMobile = useUIStore((s) => s.openMenuInMobile)
  const openShoppingCartInMobile = useUIStore(
    (s) => s.openShoppingCartInMobile
  )
  const showNotification = useUIStore((s) => s.showNotification)

  return (
    <div
      id="Head-section"
      className="md:hidden min-w-[336px] flex items-center justify-between fixed z-50 w-full h-16 px-4 sm:px-6 bg-white dark:bg-zinc-700"
    >
      {/* Hamburger icon */}
      <div onClick={openMenuInMobile}>
        <RxHamburgerMenu className="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 cursor-pointer text-zinc-700 dark:text-white" />
      </div>

      {/* Logo */}
      <div onClick={goToHome}>
        <LogoType className="w-25 h-10 text-orange-300 cursor-pointer" />
      </div>

      {/* Shopping cart icon with notification */}
      <div className="relative" onClick={openShoppingCartInMobile}>
        <ShopIcon className="h-6 w-6 sm:h-8 sm:w-8 rotate-y-180 cursor-pointer text-zinc-700 dark:text-white" />
        {showNotification && (
          <span className="absolute -top-2 -right-1">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar
