import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { useUIStore } from "./uiStore"
import Router from "next/router"

type NavActions = {
  scrollTo: (id: string, opts?: ScrollIntoViewOptions) => void;
  goTo: (id: string) => void;
  goToHome: () => void;
  goToBlog: () => void;
  goToAbout: () => void;
  goToContact: () => void;
  goToProducts: () => void;
  goToBestProducts: () => void;
  goToBanner: () => void;
  goToAccessories: () => void;
  goToHeader: () => void;
}

// Smooth scroll helper
const smoothScroll = (id: string, opts?: ScrollIntoViewOptions) => {
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start", ...opts })
  })
}

// Detect if we are on homepage (with basePath support)
const isOnHome = () => {
  if (typeof window === "undefined") return false
  const base = Router.basePath || ""
  const current = window.location.pathname.replace(/\/+$/, "")
  const homeCandidates = ["", base.replace(/\/+$/, "")]
  return homeCandidates.includes(current)
}

// Navigate to homepage and scroll after route change
const goHomeAndScroll = async (id: string) => {
  const handler = () => {
    Router.events.off("routeChangeComplete", handler)
    smoothScroll(id)
  }
  Router.events.on("routeChangeComplete", handler)

  const base = Router.basePath || "/"
  await Router.push({ pathname: base, query: { scroll: id } })
}

export const useNavigationStore = create<NavActions>()(
  devtools(() => ({
    scrollTo: (id, opts) => smoothScroll(id, opts),

    goTo: async (id) => {
      if (isOnHome()) {
        smoothScroll(id)
      } else {
        await goHomeAndScroll(id)
      }
      useUIStore.getState().closeMenuInMobile()
    },

    goToHome: async () => {
      if (isOnHome()) {
        smoothScroll("home-section")
      } else {
        await goHomeAndScroll("home-section")
      }
      useUIStore.getState().closeMenuInMobile()
    },

    goToBlog: () => useNavigationStore.getState().goTo("blog-section"),
    goToAbout: () => useNavigationStore.getState().goTo("about-section"),
    goToContact: () => useNavigationStore.getState().goTo("contact-section"),
    goToProducts: () => {
      useNavigationStore.getState().goTo("products-section")
      useUIStore.getState().closeShoppingCartInMobile()
    },
    goToBestProducts: () => useNavigationStore.getState().goTo("best-products-section"),
    goToBanner: () => useNavigationStore.getState().goTo("banner-section"),
    goToAccessories: () => useNavigationStore.getState().goTo("accessories-section"),
    goToHeader: () => useNavigationStore.getState().goTo("head-section"),
  }))
)
