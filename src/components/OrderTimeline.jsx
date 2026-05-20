import { Package, CookingPot, ShoppingBag, CheckCheck } from "lucide-react"

const steps = [
  { key: "menunggu", label: "Menunggu", icon: Package },
  { key: "diproses", label: "Diproses", icon: CookingPot },
  { key: "siap-diambil", label: "Siap Diambil", icon: ShoppingBag },
  { key: "selesai", label: "Selesai", icon: CheckCheck },
]

function getActiveIndex(status) {
  const index = steps.findIndex((s) => s.key === status)
  return index >= 0 ? index : -1
}

function OrderTimeline({ currentStatus }) {
  const activeIndex = getActiveIndex(currentStatus)

  return (
    <div className="relative">
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200">
        <div
          className="h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= activeIndex
          const isCurrent = index === activeIndex

          return (
            <div key={step.key} className="flex flex-col items-center">
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-400 bg-blue-400 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                } ${isCurrent ? "scale-110 shadow-md" : ""}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? "text-blue-400" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderTimeline
