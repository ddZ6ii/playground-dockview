import { lazy, Suspense } from "react"
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom"
import { ErrorRouteElement } from "@/shared/components"
import { PageLayout } from "@/shared/layouts"
import { OverviewPage } from "@/shared/pages"
import { Spinner } from "@/shared/components/ui"

// Defer loading pages'code until rendered for the first time (lazy load)
const MapPage = lazy(() => import("@/shared/pages/MapPage"))
const ActionPage = lazy(() => import("@/shared/pages/ActionPage"))
const GanttPage = lazy(() => import("@/shared/pages/GanttPage"))
const KanbanPage = lazy(() => import("@/shared/pages/KanbanPage"))
const ListPage = lazy(() => import("@/shared/pages/ListPage"))
const InConstruction = lazy(() => import("@/shared/pages/InConstruction"))
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"))

export default function AppRoutes() {
  const routes = publicRoutes
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorRouteElement />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "map",
        element: (
          <Suspense fallback={<Spinner />}>
            <MapPage />
          </Suspense>
        ),
      },
      {
        path: "action",
        element: (
          <Suspense fallback={<Spinner />}>
            <ActionPage />
          </Suspense>
        ),
      },
      {
        path: "gantt",
        element: (
          <Suspense fallback={<Spinner />}>
            <GanttPage />
          </Suspense>
        ),
      },
      {
        path: "kanban",
        element: (
          <Suspense fallback={<Spinner />}>
            <KanbanPage />
          </Suspense>
        ),
      },
      {
        path: "list",
        element: (
          <Suspense fallback={<Spinner />}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<Spinner />}>
            <InConstruction />
          </Suspense>
        ),
      },
      {
        path: "logout",
        element: (
          <Suspense fallback={<Spinner />}>
            <InConstruction />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    errorElement: <ErrorRouteElement />,
    element: (
      <Suspense fallback={<Spinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]
