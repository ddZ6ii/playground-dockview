import {
  ButtonHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
  SVGAttributes,
  useCallback,
  useState,
} from "react"
import { twMerge } from "tailwind-merge"
import {
  Button as BaseButton,
  ClickAwayListener,
  ToolTip,
} from "@/shared/components/ui"

type DropdownProps = {
  id: string
  menuItems: string[]
  defaultValue?: string
  onSelectItem?: (selectedItem: string) => void
  tooltip?: string
}

export default function Dropdown({
  id,
  menuItems,
  defaultValue = "",
  onSelectItem,
  tooltip = "Select item",
}: DropdownProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState(defaultValue)

  const handleSelectItem = (
    _e: React.MouseEvent<HTMLButtonElement>,
    nextItem: string,
  ) => {
    setSelectedItem(nextItem)
    setIsOpened(false)
    onSelectItem?.(nextItem)
  }
  const handleToggleDropdown = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpened((prev) => !prev)
  }
  const handleClickAway = useCallback(() => {
    setIsOpened(false)
  }, [])

  return (
    <ClickAwayListener onClickAway={handleClickAway} className="group relative">
      <Button
        id={`${id}-button`}
        aria-expanded={isOpened}
        aria-controls={`${id}-menu`}
        onClick={handleToggleDropdown}
        className={isOpened ? "bg-indigo-500" : ""}
      >
        {selectedItem ? selectedItem : "Dropdown button"}
        <ArrowIcon className={isOpened ? "rotate-180" : ""} />
        <ToolTip
          show={!isOpened}
          data-tooltip={id}
          className="right-0 bottom-0 translate-y-[120%]"
        >
          {tooltip}
        </ToolTip>
      </Button>
      <DropDownMenu
        id={`${id}-menu`}
        aria-labelledby={`${id}-button`}
        show={isOpened}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item}>
              <ListItemButton
                selected={item === selectedItem}
                onClick={(e) => {
                  handleSelectItem(e, item)
                }}
              >
                {item}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DropDownMenu>
    </ClickAwayListener>
  )
}

function Button({
  className = "",
  ...restProps
}: ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      aria-haspopup={true}
      className={twMerge(
        "m-0 w-fit max-w-none px-2 py-1 font-[Roboto] text-sm",
        className,
      )}
      {...restProps}
    />
  )
}

function ArrowIcon({
  className = "",
  ...restProps
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      className={twMerge(
        "ms-3 h-2.5 w-2.5 transition-transform duration-150 ease-linear",
        className,
      )}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
      {...restProps}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  )
}

function DropDownMenu({
  show,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement> & {
  show: boolean
}) {
  return (
    show && (
      <div
        className="absolute right-0 bottom-0 z-10 w-full translate-y-[105%] divide-y divide-gray-100 rounded-lg bg-none font-[Roboto] text-sm shadow-xl shadow-indigo-200"
        {...restProps}
      >
        {children}
      </div>
    )
  )
}

function List({ children, ...restProps }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ul role="menu" className="overflow-clip rounded-sm bg-none" {...restProps}>
      {children}
    </ul>
  )
}

function ListItem({ children, ...restProps }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li role="menuitem" {...restProps}>
      {children}
    </li>
  )
}

function ListItemButton({
  selected,
  children,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean
}) {
  const buttonStyle = {
    base: "w-full cursor-pointer px-4 py-2 text-left font-[Roboto] text-sm focus-visible:outline-0",
    selected:
      "bg-indigo-500 text-slate-50 hover:bg-indigo-600 focus-visible:bg-indigo-600",
    unselected:
      "bg-slate-50 text-indigo-700 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:text-indigo-600 focus-visible:bg-indigo-50",
  }

  return (
    <button
      type="button"
      className={twMerge(
        buttonStyle.base,
        selected ? buttonStyle.selected : buttonStyle.unselected,
      )}
      {...restProps}
    >
      {children}
    </button>
  )
}
