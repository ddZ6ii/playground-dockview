import { PropsWithChildren, ReactElement } from "react"
import { twMerge } from "tailwind-merge"

type SectionProps = {
  title: string
  icon?: ReactElement
  className?: string
}

export default function Section({
  title,
  icon,
  className,
  children,
  ...restPtrops
}: PropsWithChildren<SectionProps>) {
  const baseStyle =
    "flex h-full flex-col gap-8 overflow-x-auto px-4 py-2 text-base text-inherit"

  return (
    <section className={twMerge(baseStyle, className)} {...restPtrops}>
      <h2 className="flex flex-wrap items-center justify-center gap-1 text-center text-4xl">
        {icon && (
          <div className="w-10 shrink-0 self-center justify-self-center">
            {icon}
          </div>
        )}
        {title}
      </h2>
      <div className="grow">{children}</div>
    </section>
  )
}
