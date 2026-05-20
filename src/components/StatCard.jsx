function StatCard({ icon: Icon, label, value, trend, variant = "default" }) {
  const iconVariants = {
    default: "text-blue-500 bg-blue-50",
    primary: "text-blue-500 bg-blue-50",
    pink: "text-pink-400 bg-pink-50",
    success: "text-green-500 bg-green-50",
  }

  return (
    <div className="admin-card p-5 transition-all duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-2 ${iconVariants[variant] || iconVariants.default}`}>
          {Icon && <Icon className="h-4 w-4" />}
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${
            trend.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-800">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  )
}

export default StatCard
