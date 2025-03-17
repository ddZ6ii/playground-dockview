import { ChangeEvent, useState } from "react"
import {
  // DockviewApi,
  // DockviewGroupPanelApi,
  // DockviewPanelApi,
  IDockviewPanelProps,
} from "dockview-react"

// !TODO: custom this default component to serve as template when dynamically adding a new panel...
export default function Default(
  props: IDockviewPanelProps<{ myValue: string }>,
) {
  const [title, setTitle] = useState(props.api.title ?? "")

  // const api: DockviewPanelApi = props.api
  // const groupApi: DockviewGroupPanelApi = props.group.api
  // const containerApi: DockviewApi = props.containerApi

  const { myValue } = props.params
  console.log("my custom props:", myValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onClick = () => {
    props.api.setTitle(title)
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <div>
        <span style={{ color: "grey" }}>{"props.api.title="}</span>
        <span>{props.api.title ?? ""}</span>
      </div>
      <input value={title} onChange={onChange} />
      <button onClick={onClick}>Change</button>
    </div>
  )
}
