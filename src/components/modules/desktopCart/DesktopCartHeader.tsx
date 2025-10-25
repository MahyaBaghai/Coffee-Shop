import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Link from "next/link";

type DesktopCartHeaderProps = {
  cartItems: {
    id: string | number;
    finalPrice: number;
    quantity: number;
  }[];
};

const DesktopCartHeader: React.FC<DesktopCartHeaderProps> = ({ cartItems }) => {
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center text-xs xl:text-sm font-medium font-PoppinsMedium">
      {/* Item count */}
      <div className="text-gray-300 pl-2">
        {cartItemCount} {cartItemCount === 1 ? t("Item") : t("Items")}
      </div>

      {/* View cart link */}
      <Link href="/login">
        <div className="flex items-center justify-center text-orange-300 cursor-pointer">
          <div>{t("ViewCart")}</div>
          <MdKeyboardArrowRight className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
};

export default DesktopCartHeader;
