import { HTMLProps } from "react"

// Make `htmlFor` props mandatory.
type LabelProps = HTMLProps<HTMLLabelElement> & {
  htmlFor: string
}

export default function Label({ htmlFor, children, ...restProps }: LabelProps) {
  return (
    <label htmlFor={htmlFor} {...restProps}>
      {children}
    </label>
  )
}
