import type { CartItem } from "@/types/cart.types";
import { useUIStore } from "@/stores/uiStore";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type FooterCartProps = {
  cartItems: CartItem[];
};

const FooterCart: React.FC<FooterCartProps> = ({ cartItems }) => {
  const { t } = useTranslation();
  const closeShoppingCartInMobile = useUIStore(
    (s) => s.closeShoppingCartInMobile
  );

  // calculate total price of all items in cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  return (
    <div className="flex items-center justify-between md:pb-5 md:mx-7 2xs:mx-2">
      {/* Order button */}

      <div
        onClick={closeShoppingCartInMobile}
        className={`
          flex items-center justify-center 
          xl:w-36 xl:h-14 w-32 h-12 
          rounded-xl xl:text-xl md:text-lg text-base 
          text-white font-normal font-PoppinsRegular cursor-pointer
          bg-teal-600 hover:bg-teal-700 active:bg-teal-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:active:bg-emerald-600
        `}
      >
        <Link href="/login">{t("Order")}</Link>
      </div>

      {/* Total price */}
      <div className="flex flex-col items-center font-PoppinsMedium">
        <div className="xl:text-sm text-xs font-medium text-gray-300">
          {t("Amount")}
        </div>
        <div className="flex items-center gap-x-1 text-zinc-700 dark:text-white">
          <div className="xl:text-xl md:text-lg text-base font-semibold">
            {total.toFixed(2)}
          </div>
          <div className="xl:text-sm text-xs font-text-base">€</div>
        </div>
      </div>
    </div>
  );
};

export default FooterCart;
