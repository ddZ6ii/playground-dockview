import {
  ChangeEvent,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from "react"
import {
  ActiveEvent,
  DockviewGroupPanel,
  DockviewIDisposable,
  IDockviewPanelProps,
  PanelDimensionChangeEvent,
} from "dockview-react"
import { debounce } from "lodash"
import { twMerge } from "tailwind-merge"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { Button, InputField } from "@/shared/components/ui"
import { Section } from "@/shared/layouts"
import { Size } from "@/shared/types"

export default function Map({
  api,
  containerApi,
  params: _params,
}: IDockviewPanelProps) {
  const [title, setTitle] = useState(api.title ?? "")
  const [isPanelActive, setIsPanelActive] = useState(api.isActive)
  const [activePanel, setActivePanel] = useState<string | undefined>(
    containerApi.activePanel?.title ?? containerApi.activePanel?.id,
  )
  const [panelSize, setPanelSize] = useState<Size>({
    width: api.width,
    height: api.height,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const nextTitle = value.trim()
    setTitle(nextTitle)
    api.setTitle(nextTitle)
    setActivePanel(nextTitle)
  }

  useEffect(() => {
    const debouncedResize = debounce(
      (nextWidth: number, nextHeight: number) => {
        setPanelSize({ width: nextWidth, height: nextHeight })
      },
      300,
    )

    const disposableGroupChange = containerApi.onDidActiveGroupChange(
      (e: DockviewGroupPanel | undefined) => {
        setActivePanel(e?.activePanel?.title ?? "")
      },
    )

    /**
     * Retrieve dynamic information from dockview api events listeners.
     *
     * Since we need to render these information on screen, we must store them in state.
     * To limit component's re-rendering for efficiency purposes, setting the state is done through a debounce function.
     */
    const disposableDimensionChange = api.onDidDimensionsChange(
      (e: PanelDimensionChangeEvent) => {
        debouncedResize(e.width, e.height)
      },
    )
    const disposableActiveChange = api.onDidActiveChange((e: ActiveEvent) => {
      setIsPanelActive(e.isActive)
    })

    // Collect all disposable references to event listeners for cleanup.
    const disposables: DockviewIDisposable[] = [
      disposableGroupChange,
      disposableDimensionChange,
      disposableActiveChange,
    ]

    // Cleanup event listeners.
    return () => {
      disposables.forEach((disposable) => {
        disposable.dispose()
      })
    }
  }, [api, containerApi])

  return (
    <Section title="Map" icon={<GlobeAltIcon />}>
      <Wrapper className="gap-12">
        <InputField
          id="title"
          label="Change panel's title:"
          value={title}
          onChange={handleChange}
        />
        <Wrapper>
          <ul className="list-inside list-disc">
            Available information:
            <li>
              component&apos;s id: <em>{api.component}</em>
            </li>
            <li>
              active panel: <em>{activePanel}</em>
            </li>
            <li>
              active panel: <em>{JSON.stringify(isPanelActive)}</em>
            </li>
            <li>
              height (including header): <em>{panelSize.height} px</em>
            </li>
            <li>
              width: <em>{panelSize.width} px</em>
            </li>
          </ul>
        </Wrapper>

        <Button
          className="w-fit max-w-none"
          onClick={(_e) => {
            api.close()
          }}
        >
          Close panel
        </Button>
      </Wrapper>
    </Section>
  )
}

function Wrapper({
  children,
  className = "",
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={twMerge("flex flex-col gap-4", className)}>{children}</div>
  )
}
