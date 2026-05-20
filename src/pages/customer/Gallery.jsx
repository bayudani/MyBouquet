import { useState, useMemo } from "react";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import GalleryGrid from "@/components/GalleryGrid";
import bouquets from "@/data/bouquets.json";

const categories = [
  "Semua",
  "Wisuda",
  "Snack Bouquet",
  "Doll Bouquet",
  "Artificial Flower",
  "Anniversary",
  "Ulang Tahun",
  "Custom",
];

function Gallery() {
  const [category, setCategory] = useState("Semua");

  const filtered = useMemo(() => {
    return bouquets.filter((b) => {
      return category === "Semua" || b.category === category;
    });
  }, [category]);

  const galleryItems = filtered.map((b) => ({
    image: b.images[0] || b.image,
    name: b.name,
    description: b.description,
    category: b.category,
  }));

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Galeri"
          title="Portfolio Kami"
          description="Inspirasi rangkaian Bouquet dari karya-karya terbaik kami."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className={`rounded-xl btn-scale ${
                category === cat
                  ? "btn-pink"
                  : "border-slate-200 text-slate-600 hover:border-pink-400 hover:text-pink-400"
              }`}
            >
              {cat === "Semua" ? (
                <Flower2 className="mr-1 h-3.5 w-3.5" />
              ) : null}
              {cat}
            </Button>
          ))}
        </div>

        <GalleryGrid
          images={galleryItems}
          emptyMessage="Tidak ada portfolio untuk kategori ini."
        />
      </div>
    </div>
  );
}

export default Gallery;
