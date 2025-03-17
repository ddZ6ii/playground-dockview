import { OptionHTMLAttributes, SelectHTMLAttributes } from "react"
import { DOCKVIEW_THEME, DockViewTheme } from "@/features/dockview/types"
import { useThemeContext } from "@/shared/hooks"

export default function SelectTheme() {
  const { theme, changeTheme } = useThemeContext()

  return (
    <Select
      value={theme}
      onChange={(e) => {
        changeTheme(e.target.value as DockViewTheme)
      }}
    >
      <Options />
    </Select>
  )
}

function Select({
  children,
  ...restProps
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="group relative">
      <select
        name="themes"
        id="theme-select"
        value="none"
        className="max-w-36 cursor-pointer appearance-none rounded-md border border-solid border-slate-200 bg-slate-800 px-3 py-1 text-ellipsis text-slate-200"
        {...restProps}
      >
        {children}
      </select>
      <span
        data-tooltip="select-theme"
        className="absolute right-0 bottom-0 z-10 hidden translate-y-[125%] rounded-md border bg-slate-50 px-4 py-2 whitespace-nowrap text-slate-800 opacity-0 transition-discrete duration-500 group-hover:block group-hover:opacity-100"
      >
        Customize the theme
      </span>
    </div>
  )
}

function Options() {
  const dockviewThemes: DockViewTheme[] = Object.values(DOCKVIEW_THEME)
  return (
    <>
      <Option key="none" value="none" disabled hidden>
        --Select a theme--
      </Option>
      {dockviewThemes.map((theme) => (
        <Option key={theme} value={theme}>
          {theme}
        </Option>
      ))}
    </>
  )
}

function Option({
  children,
  ...restProps
}: OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...restProps}>{children}</option>
}
