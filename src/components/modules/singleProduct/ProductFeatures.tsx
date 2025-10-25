import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProductAttribute } from "@/types/product.types";

const ProductFeatures: FC<{ features: ProductAttribute[] }> = ({ features }) => {
  const { t } = useTranslation();

  if (!features || features.length === 0) return null;


  return (
    <div className="flex flex-col pb-4 mt-3 mb-4 border-b-2 border-b-gray-300 dark:border-b-white/10">
      <div className="mb-5 font-PoppinsMedium xl:text-xl lg:text-lg text-sm font-medium text-zinc-700 dark:text-gray-100 ">
        {t("features.attributes")} :
      </div>

      <div className="flex flex-wrap gap-3">
        {features.map((f) => (
          <div
            key={f.id}
            className="bg-gray-200 dark:bg-zinc-700 xl:w-49 lg:w-40 md:w-38 w-35 xl:h-28 lg:h-25 md:h-19 h-18 px-3 py-3 rounded-2xl font-PoppinsRegular xl:text-lg lg:text-base text-xs shadow-normal text-zinc-500 dark:text-gray-300"
          >
            <button className="flex flex-col text-start">
              <span className="block mb-1">{t(f.attribute.name)}</span>
              <span className="text-zinc-700 dark:text-white">{t(f.value)}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;
