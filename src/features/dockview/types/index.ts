import { ObjectValues } from "@/shared/types/utils"

export const DOCKVIEW_THEME = {
  themeDark: "dockview-theme-dark",
  themeLight: "dockview-theme-light",
  themeVs: "dockview-theme-vs",
  themeAbyss: "dockview-theme-abyss",
  themeDracula: "dockview-theme-dracula",
  themeReplit: "dockview-theme-replit",
} as const

export type DockViewTheme = ObjectValues<typeof DOCKVIEW_THEME>
