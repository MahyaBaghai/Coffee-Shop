import { FC } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product.types";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/stores/cartStore";
import { usePaginationStore } from "@/stores/paginationStore";
import ProductCard from "@/components/modules/cards/ProductCard";
import { IoIosArrowUp } from "react-icons/io";

const PRODUCTS_PER_PAGE = 4;

const AllProducts: FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useTranslation();
  const calculatePrice = useCartStore((s) => s.calculatePrice);
  const { currentPage, nextPage, prevPage } = usePaginationStore();

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products
    .slice()
    .reverse()
    .slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  return (
    <div className="@container w-full">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 mb-13 md:mt-40 mt-25">
        <div className="sectionTitle text-zinc-700 dark:text-white mb-10">
          {t("products.allProducts")}
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 2xs:gap-5 gap-2">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              finalPrice={calculatePrice(product.price, product.discount)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          {/* Prev Button */}
          <button
            onClick={() => prevPage()}
            disabled={currentPage === 1}
            className={`cursor-pointer ${currentPage === 1 && "opacity-40 cursor-not-allowed"}`}
          >
            <IoIosArrowUp className="-rotate-90 w-4 h-4 text-zinc-700 dark:text-white" />
          </button>

          {/* Current Page Number */}
          <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-orange-300 text-zinc-700 dark:text-white font-PoppinsRegular">
            {currentPage}
          </span>

          {/* Next Button */}
          <button
            onClick={() => nextPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`cursor-pointer ${currentPage === totalPages && "opacity-40 cursor-not-allowed"}`}
          >
            <IoIosArrowUp className="rotate-90 w-4 h-4 text-zinc-700 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

// Fetch products at build time (SSG + ISR)
export async function getStaticProps() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error);
    return { props: { products: [] , revalidate: 60 }};
  }

  return {
    props: {
      products: data ?? [],
    },
    revalidate: 60 *60
  };
}
