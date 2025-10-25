import { FC } from "react"
import { useTranslation } from "react-i18next"

interface FooterItem {
  title: string;
}

const footerItems: FooterItem[] = [
    { title: "footer.privacyPolicy" },
    { title: "footer.returnPolicy" },
    { title: "footer.placeOrder" },
    { title: "footer.careers" },
    { title: "footer.faq"},
    { title: "footer.imprint" },
    { title: "footer.contactUs" },
    { title: "footer.termsOfUse" },
];

const FooterSectionTwo: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col max-lg:ml-3 max-lg:mr-85 max-md:mr-60 max-sm:mr-35 max-xs:mr-15 mr-0 lg:pt-22 pt-12">
      {/* Title */}
      <div className="font-PoppinsMedium text-xl font-medium text-white mb-7">
        {t("footer.quickAccess")}
      </div>

      {/* Link items */}
      <div className="flex flex-col flex-wrap max-h-[172px] gap-y-5 xl:gap-x-5 lg:gap-x-2 font-PoppinsRegular font-normal xl:text-base text-sm text-gray-300">
        {footerItems.map((footerItem, index) => (
          <div
            key={index}
            className="flex gap-x-2 items-center group cursor-pointer transition-all"
          >
            <div className="w-2 h-1 bg-current rounded-full group-hover:bg-orange-300"></div>
            <span className="group-hover:text-orange-300 group-active:text-orange-300">
              {t(footerItem.title)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterSectionTwo
