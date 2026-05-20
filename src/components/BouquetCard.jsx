import { Link } from "react-router-dom"
import { Star } from "lucide-react"

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price)
}

const stockStyles = {
  ready: "bg-green-50 text-green-600 border-green-200",
  "hampir-habis": "bg-yellow-50 text-yellow-600 border-yellow-200",
  habis: "bg-red-50 text-red-600 border-red-200",
}

const stockLabels = {
  ready: "Ready",
  "hampir-habis": "Hampir Habis",
  habis: "Habis",
}

function BouquetCard({ bouquet }) {
  if (!bouquet) return null

  return (
    <Link to={`/bouquet/${bouquet.id}`} className="group block">
      <div className="card-instagram">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={bouquet.image}
            alt={bouquet.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="rounded-xl bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
              {bouquet.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`inline-block rounded-xl border px-2.5 py-1 text-xs font-medium shadow-sm ${stockStyles[bouquet.stockStatus] || stockStyles.ready}`}>
              {stockLabels[bouquet.stockStatus] || "Ready"}
            </span>
          </div>
          <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-xl bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-slate-700">{bouquet.rating}</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-slate-800">{bouquet.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{bouquet.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-pink-400">
              {bouquet.price > 0 ? formatPrice(bouquet.price) : "Harga Custom"}
            </span>
            <span className="text-sm font-medium text-pink-400 group-hover:underline">
              Detail
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BouquetCard
