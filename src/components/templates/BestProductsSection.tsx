import { FC, useRef } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import Cards from "@/components/modules/cards/ProductCard"
import { Product } from "@/types/product.types"
import { useCartStore } from "@/stores/cartStore"
import { useTranslation } from "react-i18next"

const BestProductsSection: FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useTranslation()
  const calculatePrice = useCartStore((s) => s.calculatePrice)
  const swiperRef = useRef<any>(null)

  // Filter only "best" tagged products
  const bestProducts = products.filter((product) =>
    product.tags?.includes("best")
  );

   // Swiper navigation handlers
  const handlePrev = () => swiperRef.current?.swiper.slidePrev();
  const handleNext = () => swiperRef.current?.swiper.slideNext();

  if (bestProducts.length === 0) {
    return null 
  }

  return (
    <section id="best-products-section" className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 mt-10 2xs:mt-15 md:mt-18 lg:mt-25">
        {/* Title */}
        <div className="text-zinc-700 dark:text-white">
          <div className="sectionTitle">{t("products.bestSellers")}</div>
          <div className="flex justify-between items-center gap-x-1 md:pb-12 pb-6">
            <span className="sectionSubtitle">{t("products.coffeeLoversChoice")}</span>
            <div className="flex gap-3 md:gap-5">
              <button
                onClick={handlePrev}
                className="md:w-11 md:h-11 w-9 h-9 rounded-full flex items-center justify-center shadow-normal bg-white hover:bg-gray-300 active:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-white dark:hover:[&_*]:text-zinc-700 dark:active:bg-white dark:active:[&_*]:text-zinc-700"
              >
                <IoIosArrowBack className="md:w-6.5 md:h-6.5 w-5 h-5 cursor-pointer text-zinc-700 dark:text-white" />
              </button>

              <button
                onClick={handleNext}
                className="md:w-11 md:h-11 w-9 h-9 rounded-full flex items-center justify-center shadow-normal bg-white hover:bg-gray-300 active:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-white dark:hover:[&_*]:text-zinc-700 dark:active:bg-white dark:active:[&_*]:text-zinc-700"
              >
                <IoIosArrowForward className="md:w-6.5 md:h-6.5 w-5 h-5 cursor-pointer text-zinc-700 dark:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Product carousel */}
        <Swiper
          slidesPerView={2}
          spaceBetween={8}
          breakpoints={{
            400: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          modules={[Navigation]}
          ref={swiperRef}
          className="mySwiper"
        >
          {bestProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Cards
                {...product}
                finalPrice={calculatePrice(product.price, product.discount)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestProductsSection;
