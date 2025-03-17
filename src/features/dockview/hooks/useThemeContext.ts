import { useContext } from "react"
import { ThemeContext } from "@/features/dockview/store/ThemeContext"

export default function useThemeContext() {
  const themeContextValue = useContext(ThemeContext)
  if (themeContextValue === null) {
    throw new Error("ThemeContext was used outside of its provider.")
  }
  return themeContextValue
}
