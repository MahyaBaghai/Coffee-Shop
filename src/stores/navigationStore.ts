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

// Smoothly scroll to a section by element id
const smoothScroll = (id: string, opts?: ScrollIntoViewOptions) => {
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start", ...opts })
  })
}

// Detect if we are currently on the homepage
// Takes into account Next.js basePath (important for GitHub Pages)
const isOnHome = () => {
  if (typeof window === "undefined") return false
  const base = Router.basePath || ""
  const current = window.location.pathname.replace(/\/+$/, "")
  const homeCandidates = ["", base.replace(/\/+$/, "")]
  return homeCandidates.includes(current)
}

// Navigate to homepage if not already there
const pushHome = async () => {
  const base = Router.basePath || "/"
  if (!isOnHome()) {
    await Router.push(base)
  }
}

export const useNavigationStore = create<NavActions>()(
  devtools(() => ({
    // Generic scroll helper
    scrollTo: (id, opts) => smoothScroll(id, opts),

    // Navigate to a section: scroll if on home, otherwise go home then scroll
    goTo: async (id) => {
      if (isOnHome()) {
        smoothScroll(id)
      } else {
        const handler = () => {
          Router.events.off("routeChangeComplete", handler)
          smoothScroll(id)
        }
        Router.events.on("routeChangeComplete", handler)
        await pushHome()
      }
      useUIStore.getState().closeMenuInMobile()
    },

    // Special case: go to home section
    goToHome: async () => {
      if (isOnHome()) {
        smoothScroll("home-section")
      } else {
        const handler = () => {
          Router.events.off("routeChangeComplete", handler)
          smoothScroll("home-section")
        }
        Router.events.on("routeChangeComplete", handler)
        await pushHome()
      }
      useUIStore.getState().closeMenuInMobile()
    },

    // Section-specific shortcuts
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
