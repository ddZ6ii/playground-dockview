import { HTMLProps } from "react"
import { twMerge } from "tailwind-merge"

export default function Input({
  type = "text",
  className = "",
  value,
  onChange,
  ...restProps
}: HTMLProps<HTMLInputElement>) {
  const baseStyle =
    "w-full max-w-80 rounded-md border border-slate-200 px-4 py-2 focus-visible:outline-indigo-600 disabled:bg-slate-100 disabled:text-slate-300 disabled:placeholder:text-slate-300"
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={twMerge(baseStyle, className)}
      {...restProps}
    />
  )
}
