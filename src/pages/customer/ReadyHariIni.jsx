import { useState } from "react";
import { Sparkles, MessageCircle, Check } from "lucide-react";
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

function ReadyHariIni() {
  const [readyFilter, setReadyFilter] = useState("all");
  const available = bouquets.filter((b) => b.stockStatus !== "habis");

  const filtered =
    readyFilter === "all"
      ? available
      : available.filter((b) => b.stockStatus === readyFilter);

  const readyCount = bouquets.filter((b) => b.stockStatus === "ready").length;
  const hampirHabisCount = bouquets.filter(
    (b) => b.stockStatus === "hampir-habis",
  ).length;

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Ready Hari Ini"
          title="Langsung Tersedia di Studio"
          description="Bouquet-Bouquet yang sudah siap dan bisa langsung Anda bawa pulang."
        />

        <div className="mb-8 flex justify-center gap-4 text-center">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-3">
            <p className="text-2xl font-bold text-green-600">{readyCount}</p>
            <p className="text-xs font-medium text-green-600">Ready</p>
          </div>
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-3">
            <p className="text-2xl font-bold text-yellow-600">
              {hampirHabisCount}
            </p>
            <p className="text-xs font-medium text-yellow-600">Hampir Habis</p>
          </div>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {["all", "ready", "hampir-habis"].map((f) => (
            <button
              key={f}
              onClick={() => setReadyFilter(f)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                readyFilter === f
                  ? "border-pink-400 bg-pink-300/10 text-pink-400"
                  : "border-slate-200 text-slate-600 hover:border-pink-400 hover:text-pink-400"
              }`}
            >
              {f === "all" ? "Semua" : f === "ready" ? "Ready" : "Hampir Habis"}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bouquet) => {
            const stock = stockLabels[bouquet.stockStatus] || stockLabels.ready;
            return (
              <div key={bouquet.id} className="card-instagram">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={bouquet.image}
                    alt={bouquet.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-block rounded-xl border px-3 py-1 text-xs font-medium shadow-sm ${stock.class}`}
                    >
                      {stock.text}
                    </span>
                  </div>
                  {bouquet.stockStatus === "hampir-habis" && (
                    <div className="absolute top-3 left-3 rounded-xl bg-white/90 px-2.5 py-1 text-xs font-medium text-yellow-600 shadow-sm backdrop-blur-sm">
                      Segera habis!
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {bouquet.name}
                  </h3>
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
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-pink-400">
                      {formatPrice(bouquet.price)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20kak,%20saya%20mau%20pesan%20${encodeURIComponent(bouquet.name)}%20yang%20ready%20hari%20ini`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full rounded-xl bg-green-500 text-white btn-scale hover:bg-green-600">
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
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="text-slate-500">
              Tidak ada Bouquet ready saat ini. Cek lagi nanti atau hubungi kami
              via WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadyHariIni;
