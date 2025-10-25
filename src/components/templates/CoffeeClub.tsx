import { FC } from "react";
import Discovery from "@/components/modules/icons/Discovery";
import Activity from "@/components/modules/icons/Activity";
import TicketStar from "@/components/modules/icons/TicketStar";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

const CoffeeClub: FC = () => {
  const { t } = useTranslation();
  return (
    <section id="club-section" className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4">
        <div className="flex max-md:flex-col items-center bg-linear-to-l from-emerald-500 to-emerald-600 rounded-2xl text-white shadow-normal w-full px-6 md:px-3 lg:px-6 py-5 lg:py-8 xl:gap-10 lg:gap-8 xmd:gap-12 md:gap-3 gap-8 mt-10 2xs:mt-15 md:mt-18 lg:mt-20">
          {/* Club logo and title */}
          <div className="flex items-center gap-x-3 md:gap-x-3 lg:gap-x-5 xl:gap-x-6">
            <img
              src="/Coffee-Shop/images/club/diamond.png"
              alt="Coffee Club"
              className="w-[68px] 2xs:w-[87px] lg:w-[110px] shrink-0  cursor-pointer"
            />
            <div className="italic flex flex-col md:gap-2 gap-0.5">
              <div className="font-VolkhovBold font-bold lg:text-4xl xmd:text-3xl 2xs:text-2xl text-xl">
                {t("club.coffeeClub")}
              </div>
              <div className="font-VolkhovRegular font-light xl:text-xl lg:text-lg md:text-sm sm:text-base 2xs:text-sm text-xs">
                {t("club.pointsInfo")}
              </div>
            </div>
          </div>

          {/* Club features and points */}
          <div className="flex xl:gap-15 lg:gap-10 xmd:gap-6 md:gap-3 sm:gap-25 xs:gap-16 2xs:gap-6 gap-3">
            {/* Feature icons */}
            <div className="flex xl:gap-5 lg:gap-3 gap-2">
              <div className="clubIconBox">
                <Discovery className="clubIcon" />
                <div className="clubIconDis">{t("club.spinWheel")}</div>
              </div>
              <div className="clubIconBox">
                <Activity className="clubIcon" />
                <div className="clubIconDis">{t("club.missions")}</div>
              </div>
              <div className="clubIconBox">
                <TicketStar className="clubIcon" />
                <div className="clubIconDis">{t("club.rewards")}</div>
              </div>
            </div>

            {/* Points and claim button */}
            <div className="flex flex-col items-center justify-center text-white font-PoppinsMedium">
              <div className="font-semibold xl:text-4xl lg:text-3xl 2xs:text-2xl text-xl">
                542
              </div>
              <div className="font-normal text-center lg:text-base text-xs">
                {t("club.yourPoints")}
              </div>
              <div className="flex items-center justify-center lg:w-35 lg:h-9 sm:w-28 sm:h-9 md:h-7 md:w-23 xs:w-22 2xs:w-20 w-18 h-7 bg-linear-to-r from-orange-300 to-orange-200 rounded-full mt-2 cursor-pointer">
                <div className="font-normal lg:text-sm text-xs">
                  {t("club.claimReward")}
                </div>
                <IoIosArrowForward className="md:w-4 md:h-4 w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeClub;
