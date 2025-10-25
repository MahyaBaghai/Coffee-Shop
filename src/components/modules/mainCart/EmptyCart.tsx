import { PiShoppingCartSimple } from "react-icons/pi";
import { useUIStore } from "@/stores/uiStore";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const EmptyCart: React.FC = () => {
  const { t } = useTranslation();
  const closeShoppingCartInMobile = useUIStore(
    (s) => s.closeShoppingCartInMobile
  );

  return (
    <div className="flex flex-col items-center gap-10 py-14 md:px-18 px-5">
      {/* Empty cart icon + text */}
      <div className="flex flex-col items-center gap-3">
        <PiShoppingCartSimple className="w-20 h-20 rotate-y-180 text-gray-300" />
        <div className="font-PoppinsMedium text-base text-zinc-700 dark:text-white">
          {t("EmptyCart")}
        </div>
      </div>

      {/* Button to navigate to shop page */}
      <button
        onClick={closeShoppingCartInMobile}
        className="xl:w-64 md:w-54 w-47 h-14 rounded-xl font-PoppinsMedium xl:text-xl text-lg text-white bg-teal-600 hover:bg-teal-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer"
      >
        <Link href="/products">{t("ViewShopPage")}</Link>
      </button>
    </div>
  );
};
export default EmptyCart;
