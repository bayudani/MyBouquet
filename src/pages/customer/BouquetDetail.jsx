import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MessageCircle, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import bouquets from "@/data/bouquets.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const stockLabels = {
  ready: { text: "Ready", class: "text-green-500" },
  "hampir-habis": { text: "Hampir Habis", class: "text-yellow-500" },
  habis: { text: "Habis", class: "text-red-400" },
};

function BouquetDetail() {
  const { id } = useParams();
  const bouquet = bouquets.find((b) => b.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!bouquet) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-2xl font-bold text-slate-800">
            Bouquet Tidak Ditemukan
          </h2>
          <p className="mt-2 text-slate-500">
            Bouquet yang Anda cari tidak tersedia.
          </p>
          <Link to="/catalog">
            <Button className="btn-pink mt-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Katalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stock = stockLabels[bouquet.stockStatus] || stockLabels.ready;
  const similars = bouquets
    .filter((b) => b.category === bouquet.category && b.id !== bouquet.id)
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/catalog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-pink-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={bouquet.images[selectedImage]}
                alt={bouquet.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
            {bouquet.images.length > 1 && (
              <div className="flex gap-3">
                {bouquet.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === index
                        ? "border-pink-400"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge
                variant="outline"
                className="mb-3 rounded-xl border-blue-200 bg-blue-50 text-blue-500"
              >
                {bouquet.category}
              </Badge>
              <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                {bouquet.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-600">
                    {bouquet.rating}
                  </span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-slate-500">
                  {bouquet.flowers.length} jenis bunga
                </span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-slate-600">
              {bouquet.description}
            </p>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-800">
                Bunga yang Digunakan:
              </h3>
              <div className="flex flex-wrap gap-2">
                {bouquet.flowers.map((flower) => (
                  <span
                    key={flower}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-pink-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    <Check className="h-3 w-3 text-green-500" />
                    {flower}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${stock.class}`}
              >
                <Check className="h-4 w-4" />
                {stock.text}
              </span>
            </div>

            <div className="rounded-2xl bg-pink-soft p-6">
              <p className="text-sm text-slate-500">Harga</p>
              <p className="text-3xl font-bold text-pink-400">
                {bouquet.price > 0
                  ? formatPrice(bouquet.price)
                  : "Harga Custom"}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/6281234567890?text=Halo%20kak,%20saya%20tertarik%20dengan%20${encodeURIComponent(bouquet.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full rounded-xl bg-green-500 py-6 text-base btn-scale hover:bg-green-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Pesan via WhatsApp
                </Button>
              </a>
              <Link to="/custom-order" className="flex-1">
                <Button
                  variant="outline"
                  className="btn-pink-outline w-full py-6 text-base"
                >
                  Buat Custom Bouquet
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {similars.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-slate-800">
              Bouquet Serupa
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similars.map((b) => (
                <Link
                  key={b.id}
                  to={`/bouquet/${b.id}`}
                  className="group block"
                >
                  <div className="card-instagram">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={b.image}
                        alt={b.name}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-slate-800">
                        {b.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-pink-400">
                        {formatPrice(b.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default BouquetDetail;
