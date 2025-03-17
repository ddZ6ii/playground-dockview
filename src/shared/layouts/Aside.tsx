import { ButtonHTMLAttributes, Fragment, PropsWithChildren } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { ChevronRightIcon } from "@heroicons/react/16/solid"
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3CenterLeftIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  MapIcon,
  NumberedListIcon,
  UserIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline"
import { ToolTip } from "@/shared/components/ui"
import { usePreferenceContext } from "@/shared/hooks"
import { NavItemProps, TLink } from "@/shared/types"

export default function Aside() {
  return (
    <AsideContainer>
      <Nav>
        <NavList>
          <NavItems />
        </NavList>
      </Nav>
      <ToggleNav />
    </AsideContainer>
  )
}

function AsideContainer({ children }: PropsWithChildren) {
  return (
    <aside className="relative items-center bg-slate-200 text-slate-800">
      {children}
    </aside>
  )
}

function Nav({ children }: PropsWithChildren) {
  return <nav className="h-full">{children}</nav>
}

function NavList({ children }: PropsWithChildren) {
  return (
    <ul className="flex h-full flex-col justify-between py-10">{children}</ul>
  )
}

function NavItems() {
  const links: TLink[] = [
    {
      id: 1,
      icon: <HomeIcon className="w-5" />,
      text: "Overview",
      to: "/",
    },
    { id: 2, icon: <MapIcon className="w-5" />, text: "Map", to: "/map" },
    {
      id: 3,
      icon: <ClipboardDocumentListIcon className="w-5" />,
      text: "Action",
      to: "/action",
    },
    {
      id: 4,
      icon: <Bars3CenterLeftIcon className="w-5" />,
      text: "Gantt",
      to: "/gantt",
    },
    {
      id: 5,
      icon: <ViewColumnsIcon className="w-5" />,
      text: "Kanban",
      to: "/kanban",
    },
    {
      id: 6,
      icon: <NumberedListIcon className="w-5" />,
      text: "List",
      to: "/list",
    },
    {
      id: 7,
      icon: <UserIcon className="w-5" />,
      text: "Admin",
      to: "/admin",
    },
    {
      id: 8,
      icon: <ArrowLeftStartOnRectangleIcon className="w-5" />,
      text: "Logout",
      to: "/logout",
    },
  ]
  return (
    <>
      <div className="grid gap-4">
        {links.slice(0, -1).map((link) => {
          return (
            <Fragment key={link.id}>
              {link.text.toLowerCase() === "admin" && <Divider />}
              <NavItem {...link} />
            </Fragment>
          )
        })}
      </div>
      {links.slice(-1).map((link) => (
        <NavItem
          key={link.id}
          twStyle="text-indigo-600 hover:bg-indigo-200"
          {...link}
        />
      ))}
    </>
  )
}

function NavItem({ id, to, icon, text, twStyle = "" }: NavItemProps) {
  const navigate = useNavigate()
  const { isPanelExpanded, activeNavItem, selectActiveNavItem } =
    usePreferenceContext()

  const BASE_CSS = {
    transition: "transition-all duration-300 cubic-bezier(0.39, 0, 0.47, 0.85)",
    link: "flex items-center px-4 py-2 text-sm hover:bg-slate-300 focus-visible:outline-indigo-600",
    text: "overflow-hidden",
  }

  const getActiveStyle = (isActive: boolean): string => {
    return twMerge(
      BASE_CSS.link,
      BASE_CSS.transition,
      twStyle,
      isPanelExpanded ? "gap-3" : "gap-0",
      isActive ? "bg-indigo-600 text-slate-200 hover:bg-indigo-500" : "",
    )
  }

  return (
    <li className="group relative">
      <NavLink
        to={to}
        onClick={(e) => {
          e.preventDefault()
          selectActiveNavItem(id)
          navigate(to)
        }}
        className={getActiveStyle(id === activeNavItem)}
      >
        {icon}
        <span
          className={twMerge(
            BASE_CSS.text,
            BASE_CSS.transition,
            // !TODO: try transition min-width instead to avoid overflow problem...
            isPanelExpanded ? "w-[96px] opacity-100" : "w-0 opacity-0",
          )}
        >
          {text}
        </span>
      </NavLink>
      {text.toLowerCase() !== "logout" && (
        <ToolTip
          data-tooltip="navitem"
          className="top-1/2 right-0 translate-x-[105%] -translate-y-1/2"
        >
          Open <i>{text}</i> tab
        </ToolTip>
      )}
    </li>
  )
}

function Divider() {
  return (
    <li>
      <hr className="border-slate-100" />
    </li>
  )
}

function ToggleNav({ ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isPanelExpanded, togglePanel } = usePreferenceContext()

  const BASE_CSS = {
    transition: "transition-all duration-150 ease-in-out",
    button:
      "group absolute bottom-1/4 right-0 z-10 aspect-square w-6 translate-x-1/2 rounded-full bg-slate-100 text-indigo-600 shadow-slate-400 hover:bg-indigo-600 hover:text-slate-200 shadow-md focus-visible:outline-indigo-600 focus-visible:outline-offset-2 cursor-pointer",
  }

  return (
    <button
      type="button"
      aria-label={`${isPanelExpanded ? "Close" : "Open"} sidepanel`}
      onClick={() => {
        togglePanel(!isPanelExpanded)
      }}
      className={BASE_CSS.button}
      {...restProps}
    >
      <ChevronRightIcon
        className={twMerge(
          BASE_CSS.transition,
          isPanelExpanded ? "rotate-180" : "",
        )}
      />
      <ToolTip
        data-tooltip="sidepanel"
        className={"top-1/2 right-0 translate-x-[105%] -translate-y-1/2"}
      >
        {isPanelExpanded ? "Close" : "Open"} sidepanel
      </ToolTip>
    </button>
  )
}
