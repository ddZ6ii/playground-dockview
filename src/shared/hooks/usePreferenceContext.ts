import { useContext } from "react"
import { PreferenceContext } from "@/shared/store/PreferenceContext"

export default function usePreferenceContext() {
  const preferenceContextValue = useContext(PreferenceContext)
  if (preferenceContextValue === null) {
    throw new Error("PreferenceContext was used outside of its provider.")
  }
  return preferenceContextValue
}
