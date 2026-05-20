import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard, ShoppingBag, MessageSquare, Package, Image, BarChart3, Flower2, CheckCircle,
} from "lucide-react"

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Pesanan", icon: ShoppingBag },
  { to: "/admin/custom-requests", label: "Custom Request", icon: MessageSquare },
  { to: "/admin/ready-stock", label: "Ready Stock", icon: CheckCircle },
  { to: "/admin/stock", label: "Stok Bunga", icon: Package },
  { to: "/admin/gallery", label: "Galeri", icon: Image },
  { to: "/admin/reports", label: "Laporan", icon: BarChart3 },
]

function Sidebar() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin"
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="fixed top-0 left-0 z-40 hidden h-screen w-56 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-5">
        <Flower2 className="h-4 w-4 text-pink-400" />
        <span className="text-sm font-bold text-slate-800">Bouquet Admin</span>
      </div>
      <nav className="p-3">
        <ul className="space-y-0.5">
          {adminLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.to)
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-l-2 border-blue-500 bg-blue-50 text-blue-600"
                      : "border-l-2 border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
