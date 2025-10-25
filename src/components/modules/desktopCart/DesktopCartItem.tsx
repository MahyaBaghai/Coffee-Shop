import { GoPlus } from "react-icons/go"
import { HiOutlineMinus } from "react-icons/hi2"
import { useCartStore } from "@/stores/cartStore"
import type { CartItem } from "@/types/cart.types"
import { useTranslation } from "react-i18next"

type CartItemProps = {
  item: CartItem;
};

const DesktopCartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation()
  const increaseQuantity = useCartStore((s) => s.increaseQuantity)
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity)

  return (
    <div className="flex flex-col xl:w-90 w-73 [&>*]:border-b-[1px] px-2 [&>*]:border-gray-200 dark:[&>*]:border-white/10 ">
      <div className="flex items-center pt-3">
        {/* Product image */}
        <div className="xl:w-50 xl:h-35 w-23 h-25">
          <img src={item.img} alt={item.name} />
        </div>

        {/* Product details */}
        <div className="flex flex-col gap-y-3 items-center h-28 xl:w-full w-50">
          {/* Title */}
          <div className="text-sm xl:text-base font-medium font-PoppinsMedium mr-auto line-clamp-2 text-zinc-700 dark:text-white">
            {t(item.name)}
          </div>

          {/* Quantity + Price */}
          <div className="flex xl:w-62 w-53 xl:gap-x-7 gap-x-5">
            {/* Quantity counter */}
            <div className="flex items-center justify-evenly ml-3 font-PoppinsMedium font-medium xl:text-xl text-lg rounded-[100px] xl:w-22 w-19 xl:h-11 h-9 border-[1px] border-gray-300 text-orange-300">
              <GoPlus
                onClick={() => increaseQuantity(item.id)}
                className="xl:w-5 xl:h-5 w-4 h-4 stroke-1 cursor-pointer"
              />
              <div>{item.quantity}</div>
              <HiOutlineMinus
                onClick={() => decreaseQuantity(item.id)}
                className="xl:w-5 xl:h-5 w-4 h-4 stroke-2 cursor-pointer"
              />
            </div>

            {/* Price info */}
            <div className="flex flex-col justify-between font-PoppinsMedium">
              {item.discount > 0 && (
                <div className="xl:text-sm text-xs font-normal text-teal-600 dark:text-emerald-500">
                  {t("Discount") + item.discount + "€"}
                </div>
              )}
              <div
                className={`flex items-center gap-x-1 ${
                  item.discount === 0 ? "mt-2" : ""
                } text-zinc-700 dark:text-white`}
              >
                <div className="xl:text-xl text-lg font-semibold">
                  {(item.quantity * item.finalPrice).toFixed(2)}
                </div>
                <div className="xl:text-sm text-xs font-text-base">€</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopCartItem
