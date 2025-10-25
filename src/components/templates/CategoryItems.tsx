import { FC } from "react"
import items from "@/utility/item"
import { useTranslation } from 'react-i18next'

interface Item {
  id: string | number;
  image: string;
  title: string;
}

const CategoryItems: FC = () => {
  const { t } = useTranslation()
  return (
    <section id="accessories-section" className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4">
        <div className="flex flex-wrap lg:justify-between justify-center lg:gap-x-9 md:gap-x-18 sm:gap-x-19 xs:gap-x-12 2xs:gap-x-8 gap-x-5 gap-y-4 mt-10 2xs:mt-15 md:mt-18 lg:mt-25">
          {/* Render category items */}
          {items.map((item: Item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2.5 h-full xl:w-45 lg:w-40 sm:w-35 xs:w-30 2xs:w-25 w-22"
            >
              {/* Item image */}
              <div className="flex cursor-pointer">
                <img src={item.image} alt={item.title} />
              </div>
              {/* Item title */}
              <div className="text-center font-PoppinsMedium text-xs xs:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-zinc-700 dark:text-white">
                {t(item.title)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryItems;
