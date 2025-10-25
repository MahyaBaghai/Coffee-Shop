import React from "react"
import MobileMenuHeader from "./MobileMenuHeader"
import MobileMenuBody from "./MobileMenuBody"
import MobileMenuFooter from "./MobileMenuFooter"
import ShopIcon from "@/components/modules/icons/ShopIcon"
import { useUIStore } from "@/stores/uiStore"

const MobileMenu: React.FC = () => {
  const closeMenuInMobile = useUIStore((s) => s.closeMenuInMobile)

  return (
    <div className="md:hidden flex items-center justify-end fixed top-0 left-0 right-0 w-full h-16 px-4 sm:px-6 z-20 bg-white dark:bg-zinc-700">
      {/* Side menu */}
      <div className="w-[65%] min-h-screen overflow-y-auto z-40 fixed top-0 left-0 bottom-0 bg-white dark:bg-zinc-700">
        <div className="[&_*]:text-base [&_*]:font-normal [&_*]:font-PoppinsRegular">
          <MobileMenuHeader />
          <MobileMenuBody />
          <MobileMenuFooter />
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={closeMenuInMobile}
        className="w-full min-h-screen z-30 fixed top-0 right-0 bottom-0 transition-all duration-300 bg-black/40"
      ></div>

      {/* Shopping icon */}
      <div className="flex justify-end">
        <ShopIcon className="h-6 w-6 sm:h-8 sm:w-8 rotate-y-180 z-10 text-zinc-700 dark:text-white" />
      </div>
    </div>
  );
};

export default MobileMenu
