import {
  ChangeEvent,
  FormEvent,
  FormHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react"
import { IDockviewPanelProps } from "dockview-react"
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { FormState } from "@/features/actions/types"
import { Button, InputField } from "@/shared/components/ui"
import { useActionContext } from "@/shared/hooks"
import { Section } from "@/shared/layouts"
import { getOjectKeys } from "@/shared/utils"

const initialFormState: FormState = {
  data: {
    action: "",
  },
  error: {
    action: [],
  },
  status: "typing",
}

export default function Action(_props: IDockviewPanelProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { actions, addAction } = useActionContext()
  const [formState, setFormState] = useState(initialFormState)

  const focusFirstInputWithError = (error: FormState["error"]): void => {
    const keys = getOjectKeys(error)
    const firstInputWithError = keys.find((key) => error[key].length > 0)
    if (!formRef.current || !firstInputWithError) return
    const target = formRef.current.elements.namedItem(firstInputWithError)
    if (target instanceof HTMLElement) target.focus()
  }

  const validateInput = (inputName: string, inputValue: string): boolean => {
    if (inputValue.length === 0) {
      const newError = "This field is required"
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, [inputName]: [newError] },
      }))
      return false
    }
    return true
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      data: { ...formState.data, [name]: value },
      status: "typing",
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setFormState((prev) => ({ ...prev, errors: [], status: "submitting" }))
    const action = formState.data.action.trim()
    if (validateInput("action", action)) {
      addAction(action)
      setFormState((prev) => ({
        ...prev,
        data: { ...prev.data, action: "" },
      }))
    }
    setFormState((prev) => ({
      ...prev,
      status: "typing",
    }))
  }

  useEffect(() => {
    const hasError = getOjectKeys(formState.error).some(
      (key) => formState.error[key].length > 0,
    )
    if (hasError) {
      focusFirstInputWithError(formState.error)
    }
  }, [formState.error])

  return (
    <Section title="Action" icon={<ClipboardDocumentListIcon />}>
      <div className="flex flex-col items-center gap-4">
        <Form noValidate action="" ref={formRef} onSubmit={handleSubmit}>
          <InputField
            id="action"
            name="action"
            label="Create a new action"
            placeholder="Action title..."
            value={formState.data.action}
            onChange={handleChange}
            errors={formState.error.action}
            disabled={formState.status === "submitting"}
            required
          />
          <Button type="submit" disabled={formState.status === "submitting"}>
            Add
          </Button>
        </Form>
        <InfoContainer>
          <p>
            Last action:{" "}
            <em>{actions.length ? actions[0].title : "N/A"}</em>{" "}
          </p>
          <p>
            Created at:{" "}
            <em className="break-all">
              {actions.length ? actions[0].createdAt : "N/A"}
            </em>
          </p>
        </InfoContainer>
      </div>
    </Section>
  )
}

const Form = forwardRef<
  HTMLFormElement | null, // ref
  PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> // props
>(function Form({ children, ...restProps }, formRef) {
  return (
    <form
      ref={formRef}
      className="mx-auto flex w-fit flex-col gap-2 rounded-lg border border-slate-200 px-4 py-4 text-base"
      {...restProps}
    >
      {children}
    </form>
  )
})

function InfoContainer({
  children,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div {...restProps}>{children}</div>
}
