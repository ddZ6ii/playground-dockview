import { PropsWithChildren, useMemo } from "react"
import { ThemeContext } from "@/features/dockview/store"
import { DockViewTheme } from "@/features/dockview/types"
import { useSavedPreference } from "@/shared/hooks"

export default function ThemeContextProvider({ children }: PropsWithChildren) {
  const [theme, changeTheme] = useSavedPreference<DockViewTheme>(
    "dockview-theme-light",
    "__dockviewTheme",
  )

  const themeContextValue = useMemo(
    () => ({ theme, changeTheme }),
    [theme, changeTheme],
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
