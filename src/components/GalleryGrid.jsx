function GalleryGrid({ images, emptyMessage = "Tidak ada gambar ditemukan." }) {
  if (!images || images.length === 0) {
    return (
      <div className="rounded-3xl bg-pink-soft py-16 text-center">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {images.map((item, index) => {
        const heights = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[2/3]"]
        const aspectClass = heights[index % heights.length]

        return (
          <div key={index} className="mb-6 break-inside-avoid">
            <div className="group overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className={`overflow-hidden ${aspectClass}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-800">{item.name}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{item.description}</p>
                )}
                {item.category && (
                  <span className="mt-2 inline-block rounded-xl bg-blue-400/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GalleryGrid
