import { FC } from "react"
import { useRouter } from "next/router"
import { FaRegStar } from "react-icons/fa"
import { HiOutlineShoppingCart } from "react-icons/hi2"
import { LiaExchangeAltSolid } from "react-icons/lia"
import { useCartStore } from "@/stores/cartStore"
import { useUIStore } from "@/stores/uiStore"
import { useTranslation } from "react-i18next"
import Link from "next/link"

interface CardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  discount: number;
  grade: number;
  stock: boolean;
  finalPrice: number; 
}

const ProductCard: FC<CardProps> = ({
  id,
  img,
  name,
  price,
  discount,
  grade,
  stock,
  finalPrice,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const addToCart = useCartStore((s) => s.addToCart)
  const setNotification = useUIStore((s) => s.setNotification)

  // Format price: remove trailing zeros after decimal
  const formattedPrice = finalPrice.toFixed(2).replace(/\.?0+$/, "")

  return (
    <div className="flex flex-col md:p-5 p-3 justify-center shadow-normal rounded-2xl bg-white dark:bg-zinc-700">
      
      {/* Product image (click navigates to product page) */}
      <div className="flex mb-5 relative">
        {discount > 0 && (
          <div className="flex items-center justify-center absolute left-0 rounded-full md:w-13.5 md:h-7.5 w-9 h-5 bg-orange-300 xl:m-1">
            <div className="font-PoppinsMedium md:text-base text-xs text-white font-medium dark:text-zinc-700 dark:font-semibold">
              {discount}%
            </div>
          </div>
        )}
        <Link href={`/products/${id}`} className="flex items-center" >
          <img src={img} alt={name} loading="lazy" />
        </Link>
      </div>

      {/* Title & Price */}
      <div className="flex flex-col mb-4">
        {/* Product name */}
        <div className="font-PoppinsMedium md:text-lg text-base font-medium line-clamp-2 md:h-14 h-12 mb-2.5 text-zinc-700 dark:text-white">
          {t(name)}
        </div>

        {/* Price with discount */}
        {stock && discount > 0 && (
          <div className="flex flex-row gap-x-7">
            {/* Final price */}
            <div className="flex gap-x-0.5 font-PoppinsMedium items-center text-teal-600 dark:text-emerald-500">
              <div className="font-semibold md:text-xl text-lg">{formattedPrice}</div>
              <div className="font-normal md:text-base text-xs">€</div>
            </div>

            {/* Original price (crossed out) */}
            <div className="flex font-PoppinsRegular font-normal text-gray-400 items-center relative">
              <div className="md:text-xl text-lg">{price}</div>
              <div className="md:text-sm text-xs">€</div>
              <div className="border-t-[1px] border-red-500 md:w-12 w-10 absolute right-0 left-0"></div>
            </div>
          </div>
        )}

        {/* Price without discount */}
        {stock && discount === 0 && (
          <div className="flex gap-x-0.5 font-PoppinsMedium items-center text-teal-600 dark:text-emerald-500">
            <div className="font-semibold md:text-xl text-lg">{formattedPrice}</div>
            <div className="font-normal md:text-base text-xs">€</div>
          </div>
        )}

        {/* Out of stock */}
        {!stock && (
          <div className="font-PoppinsMedium font-normal md:text-base text-sm text-red-400">
            {t("products.unavailable")}
          </div>
        )}
      </div>

      {/* Action icons + Rating */}
      <div className="flex justify-between items-center lg:gap-x-2 gap-x-1 mb-1.5">
        
        {/* Add to cart + exchange */}
        <div className="flex items-center xl:gap-x-2 gap-x-1 transition-all duration-300">
          <div className={`flex items-center justify-center xl:w-11 xl:h-11 lg:w-9 lg:h-9 w-8 h-8 rounded-full relative bg-gray-100 dark:bg-zinc-800  ${stock &&"hover:bg-teal-600 active:bg-teal-600 dark:hover:bg-emerald-500 dark:active:bg-emerald-500 cursor-pointer"}`}>
            <HiOutlineShoppingCart
              onClick={(e) => {
                e.stopPropagation() // prevent navigation when clicking cart
                if (stock) {
                  addToCart({ id, img, name, price, discount, finalPrice });
                  setNotification(true);
                }
              }}
              className={`xl:w-7 xl:h-7 lg:w-6 lg:h-6 w-5 h-5  text-gray-400  ${!stock ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:text-white active:text-white"}`}
            />
          </div>
          <LiaExchangeAltSolid className={`xl:w-6 xl:h-6 3xs:w-5 3xs:h-5 w-4 h-4 text-gray-400  ${!stock ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:text-teal-600 active:text-teal-600 dark:hover:text-emerald-500 dark:active:text-emerald-500"}`} />
        </div>

        {/* Rating stars */}
        <div className="flex xl:gap-x-0.3">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaRegStar
              key={index}
              className={`xl:w-6 xl:h-6 lg:w-5.5 lg:h-5.5 2xs:w-5 2xs:h-5 w-4 h-4 ${
                5 - 1 - index < grade
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard
