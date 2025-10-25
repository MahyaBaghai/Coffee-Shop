import Curve from "@/components/modules/icons/Curve";
import Circles from "@/components/modules/icons/Circles";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation();
  return (
    <>
      <section
        id="home-section"
        className="@container relative max-md:mt-16 md:bg-[url(/images/headerBgDesktop.webp)] bg-[url(/images/headerBgMobile.webp)] bg-no-repeat bg-cover bg-center md:min-h-screen h-50 xs:aspect-2/1 xs:h-auto md:aspect-auto"
      >
        {/* Header content */}
        <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 @3xs:mx-7 md:min-h-screen xs:min-h-[300px] min-h-[200px] flex items-center overflow-hidden relative">
          <div className="text-white">
            {/* Title */}
            <div className="font-Oswald italic font-bold text-2xl xs:text-3xl md:text-4xl xl:text-5xl md:mb-2">
              {t("header.title")}
            </div>
            {/* Subtitle */}
            <div className="font-Oswald font-light italic text-lg xs:text-2xl md:text-3xl xl:text-4xl mb-3 sm:mb-5 md:mb-8 lg:mb-11">
              {t("header.subTitle")}
            </div>
            {/* Description text */}
            <div
              className="font-PoppinsRegular italic font-normal text-xs xs:text-sm md:text-base lg:text-lg xl:text-xl 
              w-[180px] xs:w-[240px] sm:w-[260px] md:w-[300px] lg:w-[310px] xl:w-[400px]"
            >
              {t("header.description")}
            </div>
          </div>

          {/* Decorative circles */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 mx-auto">
            <Circles />
          </div>
        </div>

        {/* Decorative curve under header */}
        <div className="hidden md:block absolute -bottom-1 left-0 right-0 w-25 h-6 mx-auto text-gray-100 dark:text-zinc-800">
          <Curve />
        </div>

        {/* Scroll down indicator */}
        <div className="w-[30px] h-[30px] border-2 border-orange-300 rounded-full hidden md:flex items-center justify-center absolute bottom-0 left-0 right-0 mx-auto z-30 translate-y-1/2">
          <MdKeyboardArrowDown className="w-5 h-5 text-zinc-700 dark:text-white" />
        </div>
      </section>
    </>
  );
};

export default Landing
