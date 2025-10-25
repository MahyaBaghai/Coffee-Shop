import { useNavigationStore } from "@/stores/navigationStore"
import { useTranslation } from 'react-i18next'

const MobileSubMenu: React.FC = () => {
  const { t } = useTranslation()
  const goToProducts = useNavigationStore((s) => s.goToProducts)
  const goToBanner = useNavigationStore((s) => s.goToBanner)
  const goToBestProducts = useNavigationStore((s) => s.goToBestProducts)
  const goToAccessories = useNavigationStore((s) => s.goToAccessories)

  return (
    <div
      className={`
        relative flex flex-col gap-y-3 pl-4 pt-3
        [&>*]:font-PoppinsRegular [&>*]:font-normal [&>*]:text-sm
        [&_*]:active:text-orange-300 [&_*]:active:pl-2
        [&>*]:text-zinc-600 dark:[&>*]:text-white
      `}
    >
      <span onClick={goToProducts}>{t('products.newestProducts')}</span>
      <span onClick={goToBestProducts}>{t('products.bestSellers')}</span>
      <span onClick={goToBanner}>{t('categoryBanner.coffeeTypes')}</span>
      <span onClick={goToAccessories}>{t('coffeeAccessories')}</span>
    </div>
  );
};

export default MobileSubMenu
