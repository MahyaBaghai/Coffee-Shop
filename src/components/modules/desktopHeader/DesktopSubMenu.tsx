import React from "react"
import { useNavigationStore } from "@/stores/navigationStore"
import { useTranslation } from 'react-i18next'

const DesktopSubMenu: React.FC = () => {
  const { t } = useTranslation()
  const goToProducts = useNavigationStore((s) => s.goToProducts)
  const goToBestProducts = useNavigationStore((s) => s.goToBestProducts)
  const goToBanner = useNavigationStore((s) => s.goToBanner)
  const goToAccessories = useNavigationStore((s) => s.goToAccessories)

  return (
    <div
      className={`
        absolute top-full w-48 xl:w-53 space-y-5 py-5 px-5 shadow-black/5 
        rounded-2xl border-t-[3px] border-orange-300 
        invisible opacity-0 group-hover:visible group-hover:opacity-100 
        transition-all ease-in-out delay-75
        [&>span]:block [&>span]:leading-none [&>span]:text-sm 
        xl:[&>span]:text-base [&>span]:font-normal 
        [&>span]:hover:font-PoppinsMedium [&>span]:hover:text-orange-300
        bg-white [&>span]:text-zinc-700 dark:bg-zinc-700 dark:[&>span]:text-white
      `}
    >
      {/* Submenu items */}
      <span onClick={goToProducts}>{t('products.newestProducts')}</span>
      <span onClick={goToBestProducts}>{t('products.bestSellers')}</span>
      <span onClick={goToBanner}>{t('categoryBanner.coffeeTypes')}</span>
      <span onClick={goToAccessories}>{t('coffeeAccessories')}</span>
    </div>
  );
};

export default DesktopSubMenu
