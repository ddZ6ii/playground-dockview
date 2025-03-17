import { createContext } from "react"

type PreferenceContextValue = {
  activeNavItem: number
  selectActiveNavItem: (nextActiveNavItem: number) => void
  isPanelExpanded: boolean
  togglePanel: (nextState: boolean) => void
}

export const PreferenceContext = createContext<PreferenceContextValue | null>(
  null,
)
