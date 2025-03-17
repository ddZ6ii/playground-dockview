import { useContext } from "react"
import { ActionContext } from "@/features/actions/store"

export default function useActionContext() {
  const actionContextValue = useContext(ActionContext)
  if (actionContextValue === null) {
    throw new Error("ActionContext was used outside of its provider.")
  }
  return actionContextValue
}
