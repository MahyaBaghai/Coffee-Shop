import { GetStaticPaths, GetStaticProps } from "next";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product.types";
import ProductImage from "@/components/modules/singleProduct/ProductImage";
import ProductRating from "@/components/modules/singleProduct/ProductRating";
import ProductPrice from "@/components/modules/singleProduct/ProductPrice";
import ProductFeatures from "@/components/modules/singleProduct/ProductFeatures";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";

interface SingleProductProps {
  product: Product | null;
}

export default function SingleProductPage({ product }: SingleProductProps) {
  const { t } = useTranslation();
  const addToCart = useCartStore((s) => s.addToCart);
  const calculatePrice = useCartStore((s) => s.calculatePrice);
  const setNotification = useUIStore((s) => s.setNotification);

  // Render a fallback UI if the product does not exist
  if (!product) {
    return (
      <section className="@container">
        <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 ">
          <div className="mb-28 mt-48 w-full flex justify-center font-PoppinsMedium text-2xl text-zinc-700 dark:text-white">
            {t("products.productNotFound")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 ">
        <div className="xl:mb-28 lg:mb-25 md:mb-18 mb-15 xl:mt-48 lg:mt-45 md:mt-42 mt-30 w-full flex max-md:flex-col justify-center max-md:items-center gap-12">
          
          {/* Left column: product image */}
          <ProductImage product={product} />

          {/* Right column: product details */}
          <div className="flex flex-col">
            
            {/* Product title */}
            <div className="font-PoppinsMedium xl:text-2xl lg:text-xl text-base font-medium md:h-14 h-12 mb-3 text-zinc-700 dark:text-gray-100 border-b-2 border-b-gray-300 dark:border-b-white/10">
              {t(product.name)}
            </div>

            {/* Availability status + rating */}
            <div className="flex justify-between">
              <div
                className={`font-PoppinsMedium font-normal xl:text-xl lg:text-lg text-sm ${
                  product.stock
                    ? "text-teal-600 dark:text-emerald-500"
                    : "text-red-400"
                }`}
              >
                {product.stock ? t("products.available") : t("products.unavailable")}
              </div>
              <ProductRating grade={product.grade} />
            </div>

            {/* Dynamic product features (fetched from DB) */}
            <ProductFeatures features={product.attributes ?? []} />

            {/* Price section + Add to Cart button */}
            <div className="flex justify-between items-center">
              <div
                className={`xl:w-55 lg:w-52 w-48 bg-teal-600 dark:bg-emerald-500 p-5 rounded-2xl font-PoppinsMedium xl:text-xl lg:text-lg text-base text-gray-100 dark:text-white text-center  ${!product.stock ?"cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-teal-700 dark:hover:bg-emerald-600"}`}
                onClick={() => {
                  if (product.stock) {
                    addToCart({
                      id: product.id,
                      img: product.img,
                      name: product.name,
                      price: product.price,
                      discount: product.discount,
                      finalPrice: calculatePrice(product.price, product.discount),
                    });
                    setNotification(true);
                  }
                }}
              >
                {t("AddToCart")}
              </div>
              <ProductPrice product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Generate static paths for all products.
 * Next.js will pre-render these pages at build time.
 * Fallback "blocking" ensures new products are generated on first request.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from("products").select("id");

  const paths =
    data?.map((p) => ({
      params: { id: p.id.toString() },
    })) ?? [];

  return {
    paths,
    fallback: false ,
  };
};

/**
 * Fetch product data + its attributes from Supabase REST API.
 * Uses ISR (Incremental Static Regeneration) to keep data fresh.
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  // Fetch product by ID
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (productError || !product) {
    console.error(productError);
    return { props: { product: null } };
  }

  // Fetch related attributes via join table
  const { data: attributes, error: attrError } = await supabase
    .from("products_attributes")
    .select("id, value, attribute:attributes(id, name)")
    .eq("product_id", id);

  if (attrError) {
    console.error(attrError);
  }

  return {
    props: {
      product: {
        ...product,
        attributes: attributes ?? [],
      },
    }
  };
};
