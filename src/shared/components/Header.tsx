import { PropsWithChildren } from "react"
import { SelectTheme } from "@/features/dockview/components"

export default function Header() {
  return (
    <HeaderContainer>
      <Heading1>Logo</Heading1>
      <SelectTheme />
    </HeaderContainer>
  )
}

function HeaderContainer({ children }: PropsWithChildren) {
  return (
    <header className="flex min-h-14 items-center justify-between bg-slate-800 px-6 text-slate-200">
      {children}
    </header>
  )
}

function Heading1({ children }: PropsWithChildren) {
  return <h1 className="flex-1 font-mono text-2xl">{children}</h1>
}
