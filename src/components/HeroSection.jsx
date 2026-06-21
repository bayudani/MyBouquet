import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, Flower2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1745464265306-b66dc47c0c99?w=1920&q=85&auto=format&fit=crop"
          alt="Bouquet Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent" />
      </div>

      <div className="absolute left-10 top-1/4 h-72 w-72 rounded-full bg-pink-400/20 blur-[120px]" />
      <div className="absolute right-10 top-1/3 h-56 w-56 rounded-full bg-purple-400/15 blur-[100px]" />
      <div className="absolute bottom-40 left-1/3 h-40 w-40 rounded-full bg-pink-300/15 blur-[80px]" />

      <div className="absolute left-[15%] top-24 text-pink-300/25">
        <Flower2 className="h-7 w-7" />
      </div>
      <div className="absolute right-[18%] top-32 text-pink-200/20">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="absolute bottom-52 right-[12%] text-pink-300/20">
        <Flower2 className="h-5 w-5" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 inline-block rounded-2xl border border-white/20 bg-white/15 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md">
          ✿ Bouquet Spesial untuk Setiap Kesempatan
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="block text-pink-300">Bouquet Spesial</span>
          <span className="block">Setiap Momen Spesial</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Dari wisuda, ulang tahun, anniversary, sampe kejutan dadakan — kita bikin momen kamu makin
          istimewa dengan Bouquet yang dirangkai dengan sepenuh hati.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/catalog">
            <Button className="btn-pink h-12 px-8 text-base shadow-lg">
              Lihat Katalog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20kak,%20saya%20ingin%20tanya%20tentang%20Bouquet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-12 rounded-xl border-0 bg-white px-8 text-base font-semibold text-pink-600 shadow-lg transition-all duration-200 hover:bg-pink-50 hover:shadow-xl active:scale-95">
              <MessageCircle className="mr-2 h-4 w-4" />
              Konsultasi WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF9FC] to-transparent" />
    </section>
  )
}

export default HeroSection
