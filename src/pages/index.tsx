import { useEffect } from "react"
import { useRouter } from "next/router"
import Landing from "@/components/templates/Landing"
import ProductSection from "@/components/templates/ProductSection"
import CategoryBanner from "@/components/templates/CategoryBanner"
import CategoryItem from "@/components/templates/CategoryItems"
import BestProductsSection from "@/components/templates/BestProductsSection"
import CoffeeClub from "@/components/templates/CoffeeClub"
import BlogSection from "@/components/templates/BlogSection"
import ContactUs from "@/components/templates/ContactUs"
import ServiceList from "@/components/templates/ServiceList"
import { supabase } from "@/lib/supabaseClient"
import { Product } from "@/types/product.types"

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const router = useRouter()

  // Handle smooth scroll if query param exists 
  useEffect(() => {
    if (router.query.scroll) {
      const el = document.getElementById(router.query.scroll as string)
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [router.query.scroll])

  return (
    <>
      <Landing />
      <ProductSection products={products} />
      <CategoryBanner />
      <CategoryItem />
      <BestProductsSection products={products} />
      <CoffeeClub />
      <BlogSection />
      <ContactUs />
      <ServiceList />
    </>
  );
}

// Fetch products at build time (SSG + ISR)
export async function getStaticProps() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error);
    return { props: { products: [] } }
  }

  return {
    props: {
      products: data ?? [],
    }
  };
}
