import { ErrorBoundary } from "react-error-boundary"
import { ThemeContextProvider } from "@/features/dockview/store"
import { FallbackErrorBoundary } from "@/shared/components"
import { AppRoutes } from "@/shared/routes"
import { PreferenceContextProvider } from "@/shared/store"
import "./App.css"

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
      <ThemeContextProvider>
        <PreferenceContextProvider>
          <AppRoutes />
        </PreferenceContextProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  )
}
