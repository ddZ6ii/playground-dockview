import {
  ComponentProps,
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
} from "react"
import { IDockviewPanelProps } from "dockview-react"
import { twMerge } from "tailwind-merge"
import { NumberedListIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Button } from "@/shared/components/ui"
import { useActionContext } from "@/shared/hooks"
import { Section } from "@/shared/layouts"

export default function List(_props: IDockviewPanelProps) {
  const { actions, deleteAction } = useActionContext()
  return (
    <Section title="List" icon={<NumberedListIcon />}>
      <Heading3>Your actions:</Heading3>
      <ul className="mt-4 grid list-inside gap-2">
        {actions.map((action) => (
          <Fragment key={action.id}>
            <ListItemWrapper>
              <li>{action.title}</li>
              <DeleteButton
                className="shrink-0"
                onClick={() => {
                  deleteAction(action.id)
                }}
              >
                <TrashIcon />
              </DeleteButton>
            </ListItemWrapper>
            <Divider />
          </Fragment>
        ))}
      </ul>
    </Section>
  )
}

function Heading3({
  children,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3 className="text-lg font-semibold" {...restProps}>
      {children}
    </h3>
  )
}

function ListItemWrapper({
  children,
  ...restProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className="flex w-1/4 items-center justify-between gap-2"
      {...restProps}
    >
      {children}
    </div>
  )
}

function DeleteButton({
  children,
  className = "",
  ...restProps
}: ComponentProps<typeof Button>) {
  const baseStyle =
    "m-0 w-6 min-w-0 bg-transparent p-0 text-base text-red-900 hover:animate-rubber-band hover:bg-transparent hover:text-red-800"
  return (
    <Button
      aria-label="Delete action"
      className={twMerge(baseStyle, className)}
      {...restProps}
    >
      {children}
    </Button>
  )
}

function Divider(props: HTMLAttributes<HTMLHRElement>) {
  return <hr className="border-slate-200" {...props} />
}
