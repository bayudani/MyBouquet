import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Menu, Flower2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import Sidebar from "@/components/Sidebar"

const adminLinks = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/orders", label: "Pesanan" },
  { to: "/admin/custom-requests", label: "Custom Request" },
  { to: "/admin/ready-stock", label: "Ready Stock" },
  { to: "/admin/stock", label: "Stok Bunga" },
  { to: "/admin/gallery", label: "Galeri" },
  { to: "/admin/reports", label: "Laporan" },
]

function AdminLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin"
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:ml-56">
        <header className="flex h-14 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Flower2 className="h-5 w-5 text-pink-400" />
                  Bouquet Admin
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {adminLinks.map((link) => (
                  <SheetClose key={link.to} asChild>
                    <Link
                      to={link.to}
                      className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                        isActive(link.to)
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 lg:hidden">
            <Flower2 className="h-5 w-5 text-pink-400" />
            <span className="text-base font-bold text-slate-800">Bouquet Admin</span>
          </div>
          <div className="flex-1" />
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500">
              <ChevronLeft className="h-4 w-4" />
              Kembali ke Website
            </Button>
          </Link>
        </header>
        <div className="flex-1 p-5 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
