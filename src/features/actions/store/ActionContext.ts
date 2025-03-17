import { createContext } from "react"
import { Action } from "@/features/actions/types"

type ActionContextValue = {
  actions: Action[]
  addAction: (actionTitle: string) => void
  deleteAction: (actionId: string) => void
}

export const ActionContext = createContext<ActionContextValue | null>(null)
