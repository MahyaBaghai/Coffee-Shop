import React from "react"
import { useTheme } from "next-themes"
import Moon from "@/components/modules/icons/Moon"
import Sun from "@/components/modules/icons/Sun"
import { useTranslation } from "react-i18next"

export const ThemeToggleButton: React.FC = () => {
  const { t } = useTranslation()
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Prevent hydration mismatch by rendering only after mount
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="transition-all duration-300 ease-in-out cursor-pointer"
      >
        <Moon className="w-6 h-6" />
      </button>
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="transition-all duration-300 ease-in-out cursor-pointer"
    >
      {isDark ? (
        <div className="max-md:inline-flex">
          <Sun className="xl:w-8 xl:h-8 w-6 h-6" />
          <span className="md:hidden">{t("LightTheme")}</span>
        </div>
      ) : (
        <div className="max-md:inline-flex">
          <Moon className="xl:w-8 xl:h-8 w-6 h-6" />
          <span className="md:hidden ">{t("DarkTheme")}</span>
        </div>
      )}
    </button>
  );
};
