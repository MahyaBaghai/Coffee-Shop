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

const smoothScroll = (id: string, opts?: ScrollIntoViewOptions) => {
  setTimeout(() => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start", ...opts })
  }, 50)
}

export const useNavigationStore = create<NavActions>()(
  devtools(() => ({
    scrollTo: (id, opts) => smoothScroll(id, opts),

    // Generic goTo handler
    goTo: (id) => {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        // Already on homepage → just scroll
        smoothScroll(id)
      } else {
        // Not on homepage → redirect with query
        Router.push(`/?scroll=${id}`)
      }
      useUIStore.getState().closeMenuInMobile()
    },

    goToHome: () => {
      useNavigationStore.getState().goTo("home-section")
      Router.push("/"); // Home always goes to root
      useUIStore.getState().closeMenuInMobile()
    },

    goToBlog: () => {
      useNavigationStore.getState().goTo("blog-section")
    },

    goToAbout: () => {
      useNavigationStore.getState().goTo("about-section")
    },

    goToContact: () => {
      useNavigationStore.getState().goTo("contact-section")
    },

    goToProducts: () => {
      useNavigationStore.getState().goTo("products-section")
      useUIStore.getState().closeShoppingCartInMobile()
    },

    goToBestProducts: () => {
      useNavigationStore.getState().goTo("best-products-section")
    },

    goToBanner: () => {
      useNavigationStore.getState().goTo("banner-section")
    },

    goToAccessories: () => {
      useNavigationStore.getState().goTo("accessories-section")
    },

    goToHeader: () => {
      useNavigationStore.getState().goTo("head-section")
    },
  }))
);
