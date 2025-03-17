import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({
  type = "button",
  className = "",
  children,
  ...restProps
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const baseStyle =
    "my-2 w-full max-w-24 rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-slate-100 transition-colors duration-150 ease-linear hover:bg-indigo-500 focus-visible:bg-slate-100 focus-visible:text-indigo-600 focus-visible:outline-indigo-600 disabled:border disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-300 cursor-pointer"
  return (
    <button
      type={type}
      className={twMerge(baseStyle, className)}
      {...restProps}
    >
      {children}
    </button>
  )
}
