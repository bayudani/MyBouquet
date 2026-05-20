import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search as SearchIcon,
  MessageCircle,
  ShoppingBag,
  Star,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import bouquets from "@/data/bouquets.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const stockLabels = {
  ready: {
    text: "Ready",
    class: "bg-green-50 text-green-600 border-green-200",
  },
  "hampir-habis": {
    text: "Hampir Habis",
    class: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  habis: { text: "Habis", class: "bg-red-50 text-red-600 border-red-200" },
};

function Catalog() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return bouquets.filter((b) => {
      if (b.category === "Custom") return false;
      return (
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Katalog Produk"
          title="Pilih Bouquet Favorit Anda"
          description="Lihat produk yang tersedia dan pesan langsung via WhatsApp."
        />

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari Bouquet..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border-pink-200 pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bouquet) => {
            const stock = stockLabels[bouquet.stockStatus] || stockLabels.ready;
            return (
              <div key={bouquet.id} className="card-instagram">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Link to={`/bouquet/${bouquet.id}`}>
                    <img
                      src={bouquet.image}
                      alt={bouquet.name}
                      className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-block rounded-xl border px-2.5 py-1 text-xs font-medium shadow-sm ${stock.class}`}
                    >
                      {stock.text}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <Link to={`/bouquet/${bouquet.id}`}>
                    <h3 className="text-lg font-semibold text-slate-800 hover:text-pink-400">
                      {bouquet.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-pink-400">
                      {bouquet.price > 0
                        ? formatPrice(bouquet.price)
                        : "Harga Custom"}
                    </span>
                    {bouquet.rating && (
                      <span className="flex items-center gap-1 rounded-xl bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-600">
                        <Star className="h-3 w-3 fill-yellow-400" />
                        {bouquet.rating}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {bouquet.flowers.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-lg bg-pink-50 px-2 py-0.5 text-xs text-slate-500"
                      >
                        <Check className="h-2.5 w-2.5 text-green-500" />
                        {f}
                      </span>
                    ))}
                    {bouquet.flowers.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{bouquet.flowers.length - 3} lainnya
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20kak,%20saya%20tertarik%20dengan%20${encodeURIComponent(bouquet.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full rounded-xl bg-green-500 text-white btn-scale hover:bg-green-600"
                        disabled={bouquet.stockStatus === "habis"}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Pesan via WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-3xl bg-pink-soft py-16 text-center">
            <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="text-slate-500">Tidak ada produk ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;
