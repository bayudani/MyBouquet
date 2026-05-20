function SectionTitle({ subtitle, title, description, className = "" }) {
  return (
    <div className={`mx-auto mb-12 max-w-2xl text-center ${className}`}>
      {subtitle && (
        <p className="mb-3 inline-block rounded-2xl bg-blue-400/10 px-4 py-1 text-sm font-medium text-blue-400">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-500">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
