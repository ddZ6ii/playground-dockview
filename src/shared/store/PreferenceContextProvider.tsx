import { PropsWithChildren, useMemo } from "react"
import { useSavedPreference } from "@/shared/hooks"
import { PreferenceContext } from "@/shared/store"

export default function PreferenceContextProvider({
  children,
}: PropsWithChildren) {
  const [activeNavItem, selectActiveNavItem] = useSavedPreference<number>(
    1,
    "__activeNavItem",
  )
  const [isPanelExpanded, togglePanel] = useSavedPreference<boolean>(
    false,
    "__isPanelExpanded",
  )

  const preferenceContextValue = useMemo(
    () => ({
      activeNavItem,
      selectActiveNavItem,
      isPanelExpanded,
      togglePanel,
    }),
    [activeNavItem, selectActiveNavItem, isPanelExpanded, togglePanel],
  )

  return (
    <PreferenceContext.Provider value={preferenceContextValue}>
      {children}
    </PreferenceContext.Provider>
  )
}
