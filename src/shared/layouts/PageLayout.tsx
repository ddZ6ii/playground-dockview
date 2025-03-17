import { PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"
import { ActionContextProvider } from "@/features/actions/store"
import { Header } from "@/shared/components"
import { Aside } from "@/shared/layouts"
import { PreferenceContextProvider } from "@/shared/store"

export default function PageLayout() {
  return (
    <Wrapper>
      <Header />
      <Layout>
        <PreferenceContextProvider>
          <Aside />
          <Main>
            <ActionContextProvider>
              <Outlet />
            </ActionContextProvider>
          </Main>
        </PreferenceContextProvider>
      </Layout>
    </Wrapper>
  )
}

function Wrapper({ children }: PropsWithChildren) {
  return <div className="flex h-dvh flex-col">{children}</div>
}

function Layout({ children }: PropsWithChildren) {
  return (
    // !IMPORTANT: auto-rezise of the dockview component seems not to work properly with its parent container set to `grid` display! Use `flex` instead.
    <div className="flex grow">{children}</div>
  )
}

function Main({ children }: PropsWithChildren) {
  return <main className="h-full w-full overflow-hidden">{children}</main>
}
