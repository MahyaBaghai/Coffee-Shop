import { FC } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import ProductCard from "@/components/modules/cards/ProductCard"
import { useTranslation } from "react-i18next"
import { useCartStore } from "@/stores/cartStore"
import { Product } from "@/types/product.types"
import Link from "next/link"

const ProductSection: FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useTranslation()
  const calculatePrice = useCartStore((s) => s.calculatePrice)

  // Filter out "best" tagged products
  const normalProducts = products.filter(
    (product) => !product.tags || !product.tags.includes("best")
  );

  // Limit to first 8 products
  const limitedProducts = normalProducts.slice(0, 8)

  return (
    <section
      id="products-section"
      className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 relative z-10 lg:pt-30 md:pt-20 pt-8">
        {/* Section title */}
        <div className="text-zinc-700 dark:text-white">
          <div className="sectionTitle">{t("products.newestProducts")}</div>
          <div className="flex justify-between items-center gap-x-1 md:pb-12 pb-6">
            <div className="sectionSubtitle">{t("products.coffeeBeans")}</div>
            <div className="sectionLink">
              <Link href={"/products"} className="hidden md:block">{t("products.viewAllProducts")}</Link>
              <Link href={"/products"} className="md:hidden block">{t("ViewAll")}</Link>
              <MdKeyboardArrowRight className="sectionLinkIcon" />
            </div>
          </div>
        </div>

        {/* Product cards */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 2xs:gap-5 gap-2">
          {limitedProducts.map((limitedProduct) => (
            <ProductCard
              key={limitedProduct.id}
              {...limitedProduct}
              finalPrice={calculatePrice(limitedProduct.price, limitedProduct.discount)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
