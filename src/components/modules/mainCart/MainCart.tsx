import EmptyCart from "./EmptyCart"
import MobHeaderCart from "../mobileCart/MobileCartHeader"
import MobFullCart from "../mobileCart/MobileCartItem"
import DesHeaderCart from "../desktopCart/DesktopCartHeader"
import DesFullCart from "../desktopCart/DesktopCartItem"
import CartFooter from "./CartFooter "
import { RxHamburgerMenu } from "react-icons/rx"
import { useUIStore } from "@/stores/uiStore"
import { useCartStore } from "@/stores/cartStore"

const MainCart: React.FC = () => {
  const closeShoppingCartInMobile = useUIStore((s) => s.closeShoppingCartInMobile)
  const openShoppingCart = useUIStore((s) => s.openShoppingCart)
  const cartItems = useCartStore((s) => s.cartItems)

  return (
    <>
       {/* Desktop cart dropdown */}
      <div
        className={`
          md:block absolute right-0 top-full w-80 xl:w-100 
          max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden 
          shadow-normal rounded-2xl border-t-[3px] border-orange-300 z-30 
          invisible opacity-0 group-hover:visible group-hover:opacity-100 
          transition-all ease-in-out delay-75 bg-white dark:bg-zinc-700 
        `}
      >
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex flex-col my-4 mx-3">
              <DesHeaderCart cartItems={cartItems} />
              {cartItems.map((item) => (
                <DesFullCart key={item.id} item={item} />
              ))}
            </div>
            <CartFooter cartItems={cartItems} />
          </>
        )}
      </div>

     {/* Mobile cart drawer */}
      {openShoppingCart && ( 
        <div className="md:hidden flex items-center fixed top-0 left-0 right-0 w-full h-16 px-4 sm:px-6 z-50 bg-white dark:bg-zinc-700">
          <div className="min-h-screen flex flex-col w-[65%] fixed top-0 right-0 bottom-0 z-30 bg-white dark:bg-zinc-700">
            <div className="flex-1 overflow-y-auto">
              <MobHeaderCart />
              {cartItems.length === 0 ? (
                <EmptyCart />
              ) : (
                <>
                  {cartItems.map((item) => (
                    <MobFullCart key={item.id} item={item} />
                  ))}
                  <div className="sticky bottom-0 w-full px-3 py-5 bg-white dark:bg-zinc-700">
                    <CartFooter cartItems={cartItems} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* overlay */}
          <div
            onClick={closeShoppingCartInMobile}
            className="w-full min-h-screen z-20 fixed top-0 left-0 bottom-0 transition-all duration-300 bg-black/40"
          ></div>

          {/* Hamburger icon */}
          <div className="flex">
            <RxHamburgerMenu className="h-6 w-6 sm:h-8 sm:w-8 z-10 text-zinc-700 dark:text-white" />
          </div>
        </div>
      )}
    </>
  );
};

export default MainCart
