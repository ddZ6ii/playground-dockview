import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ToolTipProps = HTMLAttributes<HTMLSpanElement> & {
  show?: boolean
}

export default function ToolTip({
  show = true,
  children,
  className = "",
  ...restProps
}: ToolTipProps) {
  const baseStyle =
    "absolute z-10 hidden rounded-md border bg-slate-50 px-2 py-1 whitespace-nowrap text-slate-800 opacity-0 transition-discrete duration-500 group-hover:block group-hover:opacity-100 font-[Roboto] text-sm"
  return (
    show && (
      <span className={twMerge(baseStyle, className)} {...restProps}>
        {children}
      </span>
    )
  )
}
