import { useState, useEffect } from "react"
import { debounce } from "lodash"
import { UseDebouncedResize, Size } from "@/shared/types"

/**
 * Compute the available viewport dimensions (width and height) on each resize event. The event is debounced to limit performance issue.
 *
 * `window.innerWidth` and `window.innerHeight` respectively give the current viewport width INCLUDING the size of the vertical scrollbar (if any).
 *
 * To measure the "real" available dimensions of the screen estate, use `window.document.documentElement.clientWidth` and `window.document.documentElement.clientHeight` instead.
 *
 * @param {number} delayInMs the debouncing delay (time during which any new event is ignored)
 * @returns
 */
const useDebouncedResize: UseDebouncedResize = (delayInMs = 100) => {
  const [size, setSize] = useState<Size>({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight,
  })

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight,
      })
    }, delayInMs)

    window.addEventListener("resize", handleResize)

    return () => {
      handleResize.cancel()
      window.removeEventListener("resize", handleResize)
    }
  }, [delayInMs])

  return size
}

export default useDebouncedResize
