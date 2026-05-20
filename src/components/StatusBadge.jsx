function StatusBadge({ status }) {
  const styles = {
    menunggu: "bg-yellow-50 text-yellow-600 border-yellow-200",
    diproses: "bg-blue-50 text-blue-600 border-blue-200",
    "siap-diambil": "bg-pink-50 text-pink-600 border-pink-200",
    selesai: "bg-green-50 text-green-600 border-green-200",
    reviewed: "bg-purple-50 text-purple-600 border-purple-200",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    completed: "bg-green-50 text-green-600 border-green-200",
  }

  const labels = {
    menunggu: "Menunggu",
    diproses: "Diproses",
    "siap-diambil": "Siap Diambil",
    selesai: "Selesai",
    reviewed: "Ditinjau",
    pending: "Pending",
    completed: "Completed",
  }

  const currentStyle = styles[status] || styles.pending
  const currentLabel = labels[status] || status

  return (
    <span className={`inline-block rounded-xl border px-3 py-1 text-xs font-medium ${currentStyle}`}>
      {currentLabel}
    </span>
  )
}

export default StatusBadge
