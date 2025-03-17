import {
  ButtonHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react"
import {
  DockviewGroupPanelFloatingChangeEvent,
  IDockviewPanelHeaderProps,
} from "dockview-react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export default function FloatingTab(props: IDockviewPanelHeaderProps) {
  const { api, containerApi } = props

  const [isFloating, setIsFloating] = useState<boolean>(
    api.location.type === "floating",
  )
  const [isMaximized, setIsMaximized] = useState(() => api.isMaximized())

  const handleClosePanel = (_e: MouseEvent<HTMLButtonElement>): void => {
    api.close()
  }
  const handleEnlargePanel = (_e: MouseEvent<HTMLButtonElement>): void => {
    if (isMaximized) {
      api.exitMaximized()
      setIsMaximized(false)
    } else {
      api.maximize()
      setIsMaximized(true)
    }
  }
  const handleUndockPanel = (_e: MouseEvent<HTMLButtonElement>): void => {
    if (isFloating) {
      // TODO: replace hard-coded value for `referencePanel`...
      const group = props.containerApi.addGroup({
        referencePanel: "panel_3",
        direction: "below",
      })
      props.api.moveTo({ group })
    } else {
      containerApi.addFloatingGroup(api.group)
    }
  }

  useEffect(() => {
    const disposable = api.onDidLocationChange(
      (e: DockviewGroupPanelFloatingChangeEvent) => {
        setIsFloating(e.location.type === "floating")
      },
    )
    return () => {
      disposable.dispose()
    }
  }, [api])

  return (
    <div className="flex h-full w-full items-center gap-2 px-2">
      <p className="">{api.title}</p>
      <ButtonIcon aria-label="Close panel" onClick={handleClosePanel}>
        <XMarkIcon />
      </ButtonIcon>
      {!isFloating && (
        <ButtonIcon
          aria-label={`${isMaximized ? "Minimize" : "Maximize"} the panel`}
          onClick={handleEnlargePanel}
        >
          {isMaximized ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
        </ButtonIcon>
      )}
      <ButtonIcon
        aria-label={`${isFloating ? "Undock" : "Dock back"} the panel`}
        onClick={handleUndockPanel}
      >
        {isFloating ? <ArrowDownRightIcon /> : <ArrowUpRightIcon />}
      </ButtonIcon>
    </div>
  )
}

function ButtonIcon({
  children,
  ...restProps
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type="button"
      className="w-[19px] hover:bg-stone-300"
      {...restProps}
    >
      {children}
    </button>
  )
}
