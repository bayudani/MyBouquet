import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-200/20 via-white to-purple-200/20 pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-2xl bg-blue-400/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            Bouquet Spesial untuk Setiap Kesempatan
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
            <span className="block text-pink-400">Bouquet Spesial</span>
            <span className="block text-pink-400">Setiap Momen Spesial</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
            Dari wisuda, ulang tahun, anniversary, sampe kejutan dadakan  kita bikin momen kamu makin
            istimewa dengan Bouquet yang dirangkai dengan sepenuh hati.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/catalog">
              <Button className="btn-pink h-12 px-8 text-base">
                Lihat Katalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20kak,%20saya%20ingin%20tanya%20tentang%20Bouquet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-12 rounded-xl border-blue-300 px-8 text-base text-blue-400 btn-scale hover:bg-blue-400/10">
                <MessageCircle className="mr-2 h-4 w-4" />
                Konsultasi WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-300/10 blur-3xl" />
        <div className="absolute top-1/3 left-10 h-12 w-12 rounded-full bg-pink-300/20 blur-sm" />
        <div className="absolute bottom-1/4 right-16 h-8 w-8 rounded-full bg-blue-300/20 blur-sm" />
      </div>
    </section>
  )
}

export default HeroSection
