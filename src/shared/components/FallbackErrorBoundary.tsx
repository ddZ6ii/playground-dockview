import { FallbackProps } from "react-error-boundary"
import { Button } from "@/shared/components/ui"

export default function FallbackError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let errorMessage = ""
  if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = JSON.stringify(error)
  }
  return (
    <div role="alert" className="grid min-h-screen place-content-center">
      <div className="shadow-accent-500 grid gap-2 rounded-2xl border border-slate-200 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-red-500">
          Something went wrong
        </h1>
        <p className="text-red-500">{errorMessage}</p>
        <Button
          className="bg-accent-500 mx-auto mt-8"
          // Reset and re-render the whole tree inside the ErrorBoudary component.
          onClick={resetErrorBoundary}
        >
          Reload the page
        </Button>
      </div>
    </div>
  )
}
