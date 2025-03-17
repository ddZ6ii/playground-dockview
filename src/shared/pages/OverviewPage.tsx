import React, { useRef, useState } from "react"
import {
  DockviewApi,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanel,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
} from "dockview-react"
import {
  Action,
  Default,
  DefaultTab,
  FloatingTab,
  Gantt,
  Kanban,
  List,
  Map as MapComponent,
} from "@/features/dockview/components"
import PANELS from "@/features/dockview/data/panels.json"
import { useThemeContext } from "@/shared/hooks"

/**
 * Register the components to be displayed from each registered panel.
 *
 * Each component has access to the api used to control specific features on the individual panel it belongs. It also has access the group api and the container api.
 *
 * The `components` key can be referred to by one or multiple panel(s) from the `panels.json` config file to render that particular component.
 */
const components: Record<string, React.FC<IDockviewPanelProps>> = {
  default: (props: IDockviewPanelProps<{ myValue: string }>) => (
    <Default {...props} />
  ),
  map: (props: IDockviewPanelProps) => <MapComponent {...props} />,
  action: (props: IDockviewPanelProps) => <Action {...props} />,
  gant: (props: IDockviewPanelProps) => <Gantt {...props} />,
  kanban: (props: IDockviewPanelProps) => <Kanban {...props} />,
  list: (props: IDockviewPanelProps) => <List {...props} />,
}

/**
 * OPTIONAL: register tab renderers (i.e. how to display a panel's header).
 *
 * If no tabComponents is specified, the <DockviewDefaultTab /> is used by default.
 *
 * When specifying custom tabComponents, the `tabComponents` key can be referred to by one or multiple panel(s) from the `panels.json` config file to render that particular header.
 */
const tabComponents:
  | Record<string, React.FC<IDockviewPanelHeaderProps>>
  | undefined = {
  // Extend the default tab renderer config.
  default: (props: IDockviewPanelHeaderProps) => <DefaultTab {...props} />,
  // Or create your own custom tab renderer config...
  floatable: (props: IDockviewPanelHeaderProps) => <FloatingTab {...props} />,
}

export default function OverviewPage() {
  const dockviewApiRef = useRef<DockviewApi>()
  const { theme } = useThemeContext()

  // !TODO: use a ref or a state to remember panel config?
  // const panelsRefs = useRef<DockviewApi>()
  const [panelsMap, setPanelsMap] = useState(new Map<string, IDockviewPanel>())

  const onReady = (event: DockviewReadyEvent) => {
    // Store a reference to `api` in a Ref or State for later interactions.
    dockviewApiRef.current = event.api

    // Use the dock api to create the registered panels (stored in JSON file).
    for (const PANEL of PANELS) {
      const panel = event.api.addPanel(PANEL)
      if (!panelsMap.has(panel.id)) {
        setPanelsMap((prev) => new Map(prev).set(panel.id, panel))
      }
    }
  }

  return (
    <DockviewReact
      components={components} // register the panels
      tabComponents={tabComponents} // custom tab renderers
      onReady={onReady} // create the dock
      // singleTabMode="fullwidth" // when a group has only one single tab allow that tab to take the full width
      className={theme} // customize the dock's appearance
      floatingGroupBounds="boundedWithinViewport" // force the entire floating group to be bounded within the docks viewport
    />
  )
}
