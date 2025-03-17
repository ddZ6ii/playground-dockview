import { IDockviewPanelProps } from "dockview-react"
import { ViewColumnsIcon } from "@heroicons/react/24/outline"
import { Section } from "@/shared/layouts"

export default function Kanban(_props: IDockviewPanelProps) {
  return <Section title="Kanban" icon={<ViewColumnsIcon />}></Section>
}
