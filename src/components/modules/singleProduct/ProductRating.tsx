import { FC } from "react"
import { FaRegStar } from "react-icons/fa"

const ProductRating: FC<{ grade: number }> = ({ grade }) => (
  <div className="flex justify-end xl:gap-x-0.3">
    {Array.from({ length: 5 }, (_, i) => (
      <FaRegStar
        key={i}
        className={`xl:w-6 xl:h-6 lg:w-5.5 lg:h-5.5 2xs:w-5 2xs:h-5 w-4 h-4 ${
          5 - 1 - i < grade
            ? "text-yellow-400"
            : "text-gray-300 dark:text-gray-400"
        }`}
      />
    ))}
  </div>
);

export default ProductRating
