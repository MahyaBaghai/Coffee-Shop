import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import MainFooter from "@/components/modules/footer/MainFooter";
import "@/i18n";
import DesktopHeader from "@/components/modules/desktopHeader/DesktopHeader"
import MobileHeader from "@/components/modules/mobileHeader/MobileHeader"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="theme"
    >
      <div className="@container min-h-screen min-w-[380px] bg-gray-100 dark:bg-zinc-800">
        <DesktopHeader />
        <MobileHeader />
        <Component {...pageProps} />
        <MainFooter />
      </div>
    </ThemeProvider>
  );
}
