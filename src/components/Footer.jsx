import { Link } from "react-router-dom";
import { Flower2, Heart, Camera, Globe, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-pink-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Flower2 className="h-6 w-6 text-pink-400" />
              <span className="text-lg font-bold text-slate-800">Bouquet</span>
            </Link>
            <p className="text-sm text-slate-500">
              Tempat Bouquet kekinian di Pekanbaru. Ada Bouquet wisuda, snack,
              boneka, bunga artificial, dan custom dengan harga teman kantong.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-xl bg-white p-2 text-slate-500 shadow-sm transition-all hover:text-pink-400"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-xl bg-white p-2 text-slate-500 shadow-sm transition-all hover:text-pink-400"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-xl bg-white p-2 text-slate-500 shadow-sm transition-all hover:text-pink-400"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-800">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  to="/ready-hari-ini"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Ready Hari Ini
                </Link>
              </li>
              <li>
                <Link
                  to="/custom-order"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Custom Order
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Tracking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-800">
              Kategori
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/gallery?kategori=Wisuda"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Wisuda
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?kategori=Snack Bouquet"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Snack
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?kategori=Doll Bouquet"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Boneka
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?kategori=Artificial Flower"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Artificial
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?kategori=Anniversary"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Anniversary
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery?kategori=Ulang Tahun"
                  className="text-sm text-slate-500 transition-colors hover:text-pink-400"
                >
                  Bouquet Ulang Tahun
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-800">
              Kontak
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>hello@bouquetstudio.com</li>
              <li>+62 812-3456-7890</li>
              <li>Pekanbaru, Indonesia</li>
              <li className="flex items-center gap-1">Sen-Sab, 8AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-pink-100 pt-8 text-center">
          <p className="flex items-center justify-center gap-1 text-sm text-slate-400">
            Dibuat dengan <Heart className="h-3.5 w-3.5 text-pink-300" /><a href="https://byvictech.site">byvictech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
