import { HTMLAttributes, InputHTMLAttributes, useState } from "react"
import { twMerge } from "tailwind-merge"
import { ToolTip } from "@/shared/components/ui"

type SwitchProps = {
  className?: string
  label?: string
  onToggle?: () => void
}

export default function Switch({
  className = "",
  label = "Toggle me",
  onToggle,
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Label className={className}>
      <Input
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked)
          onToggle?.()
        }}
      />
      <Toggle />
      <TextLabel
        className={
          isChecked ? "text-indigo-600" : "text-slate-80 dark:text-slate-500"
        }
      >
        {label}
      </TextLabel>
      <ToolTip data-tooltip="ganttview">{label}</ToolTip>
    </Label>
  )
}

function Label({
  children,
  className = "",
  ...restProps
}: HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={twMerge(
        "group relative inline-flex w-fit cursor-pointer items-center gap-2 font-[Roboto] text-sm has-focus-visible:outline has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600",
        className,
      )}
      {...restProps}
    >
      {children}
    </label>
  )
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className="peer sr-only" {...props} />
}

function Toggle(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="peer h-6 w-10 rounded-full bg-slate-100 peer-checked:bg-indigo-600 after:absolute after:start-[4px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white focus-visible:outline rtl:peer-checked:after:-translate-x-full dark:border-slate-600 dark:bg-slate-500"
      {...props}
    />
  )
}

function TextLabel({
  children,
  className = "",
  ...restProps
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={twMerge("0 text-sm font-medium", className)}
      {...restProps}
    >
      {children}
    </span>
  )
}
