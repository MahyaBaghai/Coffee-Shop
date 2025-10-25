import MobileNavbar from "./MobileNavbar"
import MobileMenu from "./MobileMenu"
import MainCart from "../mainCart/MainCart"
import { useUIStore } from "@/stores/uiStore"

const MobileHeader: React.FC = () => {
  const openShoppingCart = useUIStore((s) => s.openShoppingCart)
  const openMobileMenu = useUIStore((s) => s.openMobileMenu)

  return (
    <>
      {!openShoppingCart && !openMobileMenu && <MobileNavbar />}
      {openMobileMenu && <MobileMenu />}
      {openShoppingCart && <MainCart />}
    </>
  );
};

export default MobileHeader
