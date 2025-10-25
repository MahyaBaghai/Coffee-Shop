import { HiXMark } from "react-icons/hi2"
import { useUIStore } from "@/stores/uiStore"
import { useTranslation } from 'react-i18next'

const MobileCartHeader: React.FC = () => {
  const { t } = useTranslation()
  const closeShoppingCartInMobile = useUIStore(
    (s) => s.closeShoppingCartInMobile
  )

  return (
    <div className="flex justify-between items-center py-5 mx-5 border-b-[1px] border-gray-300 dark:border-white/10">
      {/* Close button */}
      <HiXMark
        onClick={closeShoppingCartInMobile}
        className="w-5 h-5 shrink-0 transition-all duration-300 cursor-pointer text-zinc-600 dark:text-white"
      />
      {/* Title */}
      <div className="text-base shrink-0 font-PoppinsRegular font-medium text-zinc-700 dark:text-white">
        {t('ShoppingCart')}
      </div>
    </div>
  );
};

export default MobileCartHeader 
