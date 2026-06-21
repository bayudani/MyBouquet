import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/gallery", label: "Galeri" },
  { to: "/catalog", label: "Katalog" },
  { to: "/ready-hari-ini", label: "Ready Hari Ini" },
  { to: "/custom-order", label: "Custom Order" },
  { to: "/tracking", label: "Tracking" },
]

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-3xl border border-pink-200/50 bg-white/80 px-4 shadow-md backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-pink-400" />
          <span className="text-base font-bold text-slate-800">Bouquet</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? "bg-pink-300/10 text-pink-400"
                  : "text-slate-600 hover:bg-pink-300/5 hover:text-pink-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* <Link to="/admin" className="ml-2">
            <Button className="btn-pink h-8 px-4 text-xs">
              Admin
            </Button>
          </Link> */}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Flower2 className="h-5 w-5 text-pink-400" />
                Bouquet
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2 px-4">
              {navLinks.map((link) => (
                <SheetClose key={link.to} asChild>
                  <Link
                    to={link.to}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? "bg-pink-300/10 text-pink-400"
                        : "text-slate-600 hover:bg-pink-300/5 hover:text-pink-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                {/* <Link to="/admin">
                  <Button className="btn-pink mt-2 w-full">
                    Admin Panel
                  </Button>
                </Link> */}
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
