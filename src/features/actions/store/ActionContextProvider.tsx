import { PropsWithChildren, useCallback, useMemo } from "react"
import { ActionContext } from "@/features/actions/store"
import { Action } from "@/features/actions/types"
import { useSavedPreference } from "@/shared/hooks"

export default function ActionContextProvider({ children }: PropsWithChildren) {
  const [actions, setAndSaveActions] = useSavedPreference<Action[]>(
    [],
    "__actions",
  )

  const addAction = useCallback(
    (actionTitle: string) => {
      const newAction: Action = {
        id: crypto.randomUUID(),
        title: actionTitle,
        createdAt: new Date().toISOString(),
      }
      const nextActions = [newAction, ...actions]
      setAndSaveActions(nextActions)
    },
    [actions, setAndSaveActions],
  )

  const deleteAction = useCallback(
    (actionId: string) => {
      const nextActions = actions.filter((action) => action.id !== actionId)
      setAndSaveActions(nextActions)
    },
    [actions, setAndSaveActions],
  )

  const actionContextValue = useMemo(
    () => ({ actions, addAction, deleteAction }),
    [actions, addAction, deleteAction],
  )

  return (
    <ActionContext.Provider value={actionContextValue}>
      {children}
    </ActionContext.Provider>
  )
}
