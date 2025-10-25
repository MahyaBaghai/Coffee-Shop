import { FC } from "react"
import { Product } from "@/types/product.types"
import { useCartStore } from "@/stores/cartStore"

const ProductPrice: FC<{ product: Product }> = ({ product }) => {
  const calculatePrice = useCartStore((s) => s.calculatePrice)

  // Case: product out of stock
  if (!product.stock) {
    return (
      <div className="flex font-PoppinsRegular font-normal text-gray-400 items-center relative">
        <div className="xl:text-3xl lg:text-2xl text-xl">{product.price}</div>
        <div className="xl:text-xl lg:text-base text-xs">€</div>
        <div className="border-t-[1px] border-red-500 xl:w-18 lg:w-14 absolute right-0 left-0"></div>
      </div>
    );
  }

  // Case: product has discount
  if (product.discount > 0) {
    return (
      <div className="flex flex-row lg:gap-x-7 gap-x-3">
        <div className="flex font-PoppinsRegular font-normal text-gray-400 items-center relative">
          <div className="xl:text-3xl lg:text-2xl text-xl">{product.price}</div>
          <div className="xl:text-xl lg:text-base text-xs">€</div>
          <div className="border-t-[1px] border-red-500 xl:w-20 lg:w-16 absolute right-0 left-0"></div>
        </div>
        {/* Discounted price */}
        <div className="flex gap-x-0.5 font-PoppinsMedium items-center text-teal-600 dark:text-emerald-500">
          <div className="font-semibold xl:text-3xl lg:text-2xl text-xl">
            {calculatePrice(product.price, product.discount).toFixed(2)}
          </div>
          <div className="font-normal xl:text-xl lg:text-base text-xs">€</div>
        </div>
      </div>
    );
  }

  // Case: no discount
  return (
    <div className="flex gap-x-0.5 font-PoppinsMedium items-center text-teal-600 dark:text-emerald-500">
      <div className="font-semibold xl:text-3xl lg:text-2xl text-xl">
        {calculatePrice(product.price, product.discount).toFixed(2)}
      </div>
      <div className="font-normal xl:text-xl lg:text-base text-xs">€</div>
    </div>
  );
};

export default ProductPrice;
