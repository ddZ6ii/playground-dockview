import { RefObject, useEffect } from "react"

/**
 * Detect clicks outside a React component to automatically close elements (such as dropdown, modal, tooltip...) and ensure the interface remains clean and user-friendly.
 *
 * @param ref A reference to the specific component to detect outside clicks.
 * @param cbFn Callback function to call when an outside click is detected.
 * @param addEventListener Boolean to conditionnaly add/remove the event listener (useful to detect outside clicks only when the component is visible).
 */
export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,

  cbFn: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        cbFn()
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [ref, cbFn])
}
