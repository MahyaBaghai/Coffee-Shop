import { create } from "zustand"
import { devtools } from "zustand/middleware"

type UIState = {
  openMobileMenu: boolean;
  openShoppingCart: boolean;
  openSubMenu: boolean;
  showNotification: boolean;
};

type UIActions = {
  openMenuInMobile: () => void;
  closeMenuInMobile: () => void;
  openShoppingCartInMobile: () => void;
  closeShoppingCartInMobile: () => void;
  toggleSubMenu: () => void;
  clearNotification: () => void;
  setNotification: (value: boolean) => void;
};

export const useUIStore = create<UIState & UIActions>()(
  devtools((set) => ({
    openMobileMenu: false,
    openShoppingCart: false,
    openSubMenu: false,
    showNotification: false,

    openMenuInMobile: () => set({ openMobileMenu: true }),
    closeMenuInMobile: () => set({ openMobileMenu: false }),

    openShoppingCartInMobile: () =>
      set(() => ({
        openShoppingCart: true,
        showNotification: false,
      })),

    closeShoppingCartInMobile: () => set({ openShoppingCart: false }),

    toggleSubMenu: () =>
      set((s) => ({
        openSubMenu: !s.openSubMenu,
      })),

    clearNotification: () => set({ showNotification: false }),
    setNotification: (value: boolean) => set({ showNotification: value }),
  }))
);
