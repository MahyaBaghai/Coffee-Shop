import { FC } from "react"
import { Product } from "@/types/product.types"

const ProductImage: FC<{ product: Product }> = ({ product }) => (
  <div className="flex mb-5 relative">
     {/* Product image */}
    <div className="xl:w-md lg:w-sm md:w-xs sm:w-2xs w-3xs justify-center items-center">
      <img className="mx-auto w-sm" src={product.img} alt={product.name} />
    </div>
    {/* Discount badge */}
    {product.discount > 0 && (
      <div className="flex items-center justify-center absolute right-0 rounded-full w-13.5 h-7.5 bg-orange-300 xl:m-1">
        <div className="font-PoppinsMedium text-base text-white font-medium dark:text-zinc-700 dark:font-semibold">
          {product.discount}%
        </div>
      </div>
    )}
  </div>
);

export default ProductImage
