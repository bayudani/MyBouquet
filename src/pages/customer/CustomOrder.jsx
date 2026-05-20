import { useState } from "react";
import { MessageCircle, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";

const occasions = [
  "Ulang Tahun",
  "Anniversary",
  "Pernikahan",
  "Wisuda",
  "Hari Ibu",
  "Baby Shower",
  "Acara Kantor",
  "Sekadar Kejutan",
  "Lainnya",
];

function CustomOrder() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occasion: "",
    theme: "",
    budget: "",
    color: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppMessage = () => {
    const message = `Halo kak, saya ingin custom bouquet

Nama: ${form.name || "(belum diisi)"}
Tema: ${form.theme || "(belum diisi)"}
Budget: ${form.budget || "(belum diisi)"}
Warna favorit: ${form.color || "(belum diisi)"}
Catatan: ${form.notes || "(belum diisi)"}`;

    return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(generateWhatsAppMessage(), "_blank");
  };

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Custom Order"
          title="Rancang Bouquet Impian Anda"
          description="Ceritakan apa yang Anda inginkan, dan florist kami akan menciptakan rangkaian unik khusus untuk Anda."
        />

        <div className="mx-auto max-w-2xl">
          <Card className="rounded-3xl border border-pink-200 p-6 shadow-sm sm:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flower2 className="h-5 w-5 text-pink-400" />
                Formulir Custom Bouquet
              </CardTitle>
              <CardDescription className="text-sm">
                Isi preferensi Anda, lalu lanjutkan konsultasi via WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Nama *
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="cth: John Doe"
                      required
                      className="rounded-xl border-pink-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      No. WhatsApp *
                    </label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="cth: 0812-3456-7890"
                      required
                      className="rounded-xl border-pink-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Acara *
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, occasion: occ }))
                        }
                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                          form.occasion === occ
                            ? "border-pink-400 bg-pink-300/10 text-pink-400"
                            : "border-slate-200 text-slate-600 hover:border-pink-400 hover:text-pink-400"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Tema / Konsep
                  </label>
                  <Input
                    name="theme"
                    value={form.theme}
                    onChange={handleChange}
                    placeholder="cth: Taman rustic, pastel pink, putih modern..."
                    className="rounded-xl border-pink-200"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Budget (IDR)
                    </label>
                    <Input
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      placeholder="cth: 500000"
                      type="number"
                      className="rounded-xl border-pink-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Warna Favorit
                    </label>
                    <Input
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="cth: Pink, putih, biru..."
                      className="rounded-xl border-pink-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Catatan Tambahan
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Bunga favorit, gaya pembungkusan, atau pesan khusus lainnya..."
                    rows={4}
                    className="w-full rounded-xl border border-pink-200 bg-transparent px-3 py-2.5 text-sm transition-colors placeholder:text-slate-400 focus:border-pink-400 focus:ring-3 focus:ring-pink-300/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl bg-green-500 py-6 text-base btn-scale hover:bg-green-600"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Lanjut Konsultasi WhatsApp
                </Button>

                <p className="text-center text-xs text-slate-400">
                  Dengan mengklik tombol di atas, Anda akan diarahkan ke
                  WhatsApp untuk melanjutkan konsultasi dengan florist kami.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CustomOrder;
