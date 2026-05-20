/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import AdminLayout from "@/layouts/AdminLayout"

const Home = lazy(() => import("@/pages/customer/Home"))
const Gallery = lazy(() => import("@/pages/customer/Gallery"))
const Catalog = lazy(() => import("@/pages/customer/Catalog"))
const ReadyHariIni = lazy(() => import("@/pages/customer/ReadyHariIni"))
const BouquetDetail = lazy(() => import("@/pages/customer/BouquetDetail"))
const CustomOrder = lazy(() => import("@/pages/customer/CustomOrder"))
const Tracking = lazy(() => import("@/pages/customer/Tracking"))

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Orders = lazy(() => import("@/pages/admin/Orders"))
const CustomRequests = lazy(() => import("@/pages/admin/CustomRequests"))
const ReadyStock = lazy(() => import("@/pages/admin/ReadyStock"))
const Stock = lazy(() => import("@/pages/admin/Stock"))
const GalleryManagement = lazy(() => import("@/pages/admin/GalleryManagement"))
const Reports = lazy(() => import("@/pages/admin/Reports"))

const Loading = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
  </div>
)

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><Home /></SuspenseWrapper> },
      { path: "gallery", element: <SuspenseWrapper><Gallery /></SuspenseWrapper> },
      { path: "catalog", element: <SuspenseWrapper><Catalog /></SuspenseWrapper> },
      { path: "ready-hari-ini", element: <SuspenseWrapper><ReadyHariIni /></SuspenseWrapper> },
      { path: "bouquet/:id", element: <SuspenseWrapper><BouquetDetail /></SuspenseWrapper> },
      { path: "custom-order", element: <SuspenseWrapper><CustomOrder /></SuspenseWrapper> },
      { path: "tracking", element: <SuspenseWrapper><Tracking /></SuspenseWrapper> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <SuspenseWrapper><Dashboard /></SuspenseWrapper> },
      { path: "orders", element: <SuspenseWrapper><Orders /></SuspenseWrapper> },
      { path: "custom-requests", element: <SuspenseWrapper><CustomRequests /></SuspenseWrapper> },
      { path: "ready-stock", element: <SuspenseWrapper><ReadyStock /></SuspenseWrapper> },
      { path: "stock", element: <SuspenseWrapper><Stock /></SuspenseWrapper> },
      { path: "gallery", element: <SuspenseWrapper><GalleryManagement /></SuspenseWrapper> },
      { path: "reports", element: <SuspenseWrapper><Reports /></SuspenseWrapper> },
    ],
  },
])

export default router
