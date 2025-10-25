import { FC } from "react";
import Logo from "@/components/modules/icons/Logo";
import LogoType from "@/components/modules/icons/LogoType";
import { useTranslation } from "react-i18next";
import { useNavigationStore } from "@/stores/navigationStore"

const FooterSectionOne: FC = () => {
  const { t } = useTranslation()
  const goToHome = useNavigationStore((s) => s.goToHome)

  return (
    <div className="flex flex-col text-gray-300 pt-15 max-lg:ml-3">
      {/* Logo */}
      <div onClick={goToHome} className="flex gap-x-4 mb-7 group cursor-pointer">
        <Logo className="w-14 h-13 group-hover:text-orange-300 group-active:text-orange-300 transition-all" />
        <LogoType className="w-34 h-13 group-hover:text-orange-300 group-active:text-orange-300 transition-all" />
      </div>

      {/* Short description */}
      <div className="font-PoppinsRegular font-normal xl:text-base/8 text-sm/8">
        {t("footer.mission")}
      </div>
    </div>
  );
};

export default FooterSectionOne
