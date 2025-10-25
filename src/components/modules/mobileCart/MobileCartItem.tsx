import { GoPlus } from "react-icons/go"
import { HiOutlineMinus } from "react-icons/hi2"
import { useCartStore } from "@/stores/cartStore"
import type { CartItem } from "@/types/cart.types"
import { useTranslation } from 'react-i18next'

type MobileCartItemProps = {
  item: CartItem
}

const MobileCartItem: React.FC<MobileCartItemProps> = ({ item }) => {
  const { t } = useTranslation()
  const increaseQuantity = useCartStore((s) => s.increaseQuantity)
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity)

  return (
    <div className="flex flex-col items-center mx-5 pr-5 py-5 border-b-[1px] border-gray-100 dark:border-white/10">
      <div className="flex">
        {/* Product image */}
        <div className="w-25 h-25 shrink-0">
          <img src={item.img} alt={item.name} />
        </div>

        {/* Product details */}
        <div className="[&_*]:font-PoppinsMedium space-y-3 pr-2">
          {/* Title */}
          <div className="text-sm font-medium line-clamp-2 shrink-0 text-zinc-700 dark:text-white">
            {t(item.name)}
          </div>

          <div className="flex flex-col">
            {/* Discount */}
            {item.discount > 0 && (
              <div className="font-medium text-xs text-teal-600 dark:text-emerald-500">
                {t('Discount') + item.discount + '€'}
              </div>
            )}

            <div className="flex justify-between items-center mr-5 gap-x-2">
              {/* Price */}
              <div className="flex items-center [&_*]:text-zinc-700 dark:[&_*]:text-white">
                <div className="text-base font-medium">
                  {(item.quantity * item.finalPrice).toFixed(2)}
                </div>
                <div className="text-xs font-normal">€</div>
              </div>

               {/* Quantity counter */}
              <div className="flex items-center justify-evenly font-PoppinsMedium font-medium text-base rounded-[100px] w-17 h-8 border-[1px] border-gray-300 text-orange-300">
                <div>
                  <GoPlus
                    onClick={() => increaseQuantity(item.id)}
                    className="xl:w-5 xl:h-5 w-4 h-4 stroke-1 cursor-pointer"
                  />
                </div>
                <div>{item.quantity}</div>
                <div>
                  <HiOutlineMinus
                    onClick={() => decreaseQuantity(item.id)}
                    className="xl:w-5 xl:h-5 w-4 h-4 stroke-2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCartItem 
