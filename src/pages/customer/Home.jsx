import { Link } from "react-router-dom";
import {
  ShoppingBag,
  MessageSquare,
  Search,
  Truck,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import BouquetCard from "@/components/BouquetCard";
import bouquets from "@/data/bouquets.json";

const steps = [
  {
    icon: Search,
    title: "Jelajahi Katalog",
    description:
      "Temukan berbagai Bouquet wisuda, snack, boneka, dan bunga artificial.",
  },
  {
    icon: ShoppingBag,
    title: "Pilih atau Custom",
    description:
      "Pilih produk favorit atau buat Bouquet custom sesuai keinginan.",
  },
  {
    icon: MessageSquare,
    title: "Konsultasi WhatsApp",
    description: "Diskusikan detail pesanan dengan tim kami via WhatsApp.",
  },
  {
    icon: Truck,
    title: "Ambil atau Dikirim",
    description: "Ambil langsung di studio atau pesan antar ke lokasi Anda.",
  },
];

const testimonials = [
  {
    name: "Rina Amelia",
    role: "Mahasiswi",
    content:
      "Bouquet wisudanya bagus banget! Harganya terjangkau dan bunganya segar. Temen-temen pada suka. Makasih Kak!",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Karyawan Swasta",
    content:
      "Pesen Bouquet snack buat pacar, dia seneng banget. Snacknya lengkap, banyak pilihan. Pasti order lagi!",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Ibu Rumah Tangga",
    content:
      "Pesen Bouquet artificial buat hiasan rumah, kualitasnya bagus dan mirip asli. Udah 3 bulan masih awet.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Pelanggan Tetap",
    content:
      "Sering order buat ucapan selamat. Pelayanannya ramah dan cepet respon. Recomended banget!",
    rating: 5,
  },
];

function Home() {
  const featured = bouquets.filter((b) => b.category !== "Custom").slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Koleksi Terbaru"
            title="Produk Paling Laris"
            description="Bouquet pilihan yang paling banyak dibeli pelanggan kami."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((bouquet) => (
              <BouquetCard key={bouquet.id} bouquet={bouquet} />
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/catalog">
              <Button variant="outline" className="btn-pink-outline px-8">
                Lihat Katalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/ready-hari-ini">
              <Button className="btn-pink px-8">
                <Sparkles className="mr-2 h-4 w-4" />
                Ready Hari Ini
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-pink-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Cara Kerja"
            title="Langkah Mudah Pesan Bouquet"
            description="Kami buat proses pemesanan Bouquet Anda semudah mungkin."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group card-instagram p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-300/10 text-pink-400 transition-all group-hover:bg-pink-400 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/10 text-xs font-bold text-blue-400">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Testimoni"
            title="Kata Pelanggan Kami"
            description="Lihat apa kata mereka yang sudah pernah beli Bouquet di tempat kami."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="card-instagram p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-4 border-t border-pink-100 pt-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
