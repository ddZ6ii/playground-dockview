import {
  ChangeEvent,
  HTMLAttributes,
  HTMLProps,
  PropsWithChildren,
} from "react"
import { Input, Label } from "@/shared/components/ui"

type InputFieldProps = HTMLProps<HTMLInputElement> & {
  id: string
  label: string
  value: string
  errors?: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
  type = "text",
  id,
  name = id,
  label,
  value,
  errors = [],
  onChange,
  ...restProps
}: InputFieldProps) {
  const hasError = errors.length > 0
  return (
    <FieldWrapper>
      <Label htmlFor={id}>
        {label} {restProps.required && <span className="text-red-900">*</span>}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={
          hasError ? "border border-red-900 focus-visible:outline-red-900" : ""
        }
        {...restProps}
      />
      {hasError && <ErrorMessage>{errors.join(". ")}</ErrorMessage>}
    </FieldWrapper>
  )
}

function FieldWrapper({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>
}

function ErrorMessage({
  children,
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className="text-xs text-red-900">{children}</p>
}
