import { ComponentProps, HTMLAttributes, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { Button } from "@/shared/components/ui"
import { usePreferenceContext } from "@/shared/hooks"

export default function InConstruction() {
  const navigate = useNavigate()
  const { selectActiveNavItem } = usePreferenceContext()
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    selectActiveNavItem(1)
    navigate("/")
  }
  return (
    <Wrapper>
      <Heading1>🏗️ This page is currently in construction...</Heading1>
      <BackToHomeBtn onClick={handleClick}>
        <span>Back to Home</span>
        <ArrowRightIcon className="w-4" />
      </BackToHomeBtn>
    </Wrapper>
  )
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <main className="grid h-full place-content-center gap-8">{children}</main>
  )
}

function Heading1({ children }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className="text-4xl">{children}</h1>
}

function BackToHomeBtn({
  children,
  ...restProps
}: ComponentProps<typeof Button>) {
  return (
    <Button className="flex w-fit max-w-none items-center gap-2" {...restProps}>
      {children}
    </Button>
  )
}
