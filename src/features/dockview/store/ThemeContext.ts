import { createContext } from "react"
import { DockViewTheme } from "@/features/dockview/types"

type ThemeContextValue = {
  theme: DockViewTheme
  changeTheme: (nextTheme: DockViewTheme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
