import { DockviewDefaultTab, IDockviewPanelHeaderProps } from "dockview-react"

export default function DefaultTab(props: IDockviewPanelHeaderProps) {
  return <DockviewDefaultTab hideClose={false} {...props} />
}
