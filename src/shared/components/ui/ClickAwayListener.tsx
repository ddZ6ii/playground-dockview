import { HTMLAttributes, useEffect, useRef } from "react"

type ClickAwayListenerProps = HTMLAttributes<HTMLDivElement> & {
  onClickAway?: () => void
}

/**
 * Detect clicks outside its children to automatically close elements (such as dropdown, modal, tooltip...) and ensure the interface remains clean and user-friendly.
 * @param onClickAway Callback function to call when an outside click is detected.
 * @param children
 * @returns
 */
export default function ClickAwayListener({
  onClickAway,
  children,
  ...restProps
}: ClickAwayListenerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickAway?.()
      }
    }

    document.addEventListener("click", handleClickAway)

    return () => {
      document.removeEventListener("click", handleClickAway)
    }
  }, [onClickAway])

  return (
    <div ref={ref} {...restProps}>
      {children}
    </div>
  )
}
