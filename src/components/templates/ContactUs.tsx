import { FC } from "react"
import { VscCircleSmallFilled } from "react-icons/vsc"
import { LuPhone } from "react-icons/lu"
import { useTranslation } from "react-i18next"

const ContactUs: FC = () => {
  const { t } = useTranslation()
  return (
    <section id="about-section" className="@container">
      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4">
        <div className="my-28 flex md:flex-row flex-col justify-center items-center md:gap-6 gap-10">
          {/* Contact image */}
          <div className="w-[296px] h-[305px] shrink-0">
            <img
              src="/images/contact.png"
              alt="One of the best coffees"
              className="h-full w-full mx-auto"
            />
          </div>

          {/* Contact text content */}
          <div className="text-zinc-700 dark:text-white">
            <div className="sectionTitle">{t("contact.title")}</div>
            <div className="sectionSubtitle">{t("contact.subTitle")}</div>

            {/* Decorative dots */}
            <div className="flex my-5 text-zinc-700 dark:text-gray-100">
              <VscCircleSmallFilled className="w-3 h-3" />
              <VscCircleSmallFilled className="w-3 h-3" />
              <VscCircleSmallFilled className="w-3 h-3" />
            </div>

             {/* Description */}
            <div className="font-PoppinsRegular font-normal lg:text-lg text-base italic">
             {t("contact.description")}
            </div>

            {/* Call to action button */}
            <div className="inline-flex items-center gap-x-2 text-orange-300 border-2 border-orange-300 rounded-full px-5 py-2 mt-6 cursor-pointer hover:bg-gradient-to-l hover:from-orange-200 hover:to-orange-300 hover:text-zinc-700 
              active:bg-gradient-to-l active:from-orange-200 active:to-orange-300 active:text-zinc-700">
              <LuPhone className="rotate-y-180 md:w-6 md:h-6 w-5 h-5" />
              <div className="font-PoppinsRegular font-normal lg:text-lg text-base">
                {t("contact.phoneOrder")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
