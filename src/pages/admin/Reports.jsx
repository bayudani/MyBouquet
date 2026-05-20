import { useState } from "react"
import { Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import PageHeader from "@/components/PageHeader"
import StatCard from "@/components/StatCard"
import StatusBadge from "@/components/StatusBadge"
import ordersData from "@/data/orders.json"
import stocksData from "@/data/stocks.json"

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price)
}

const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
const weeklyData = [3, 5, 2, 7, 4, 6]

function Reports() {
  const [orders] = useState(ordersData)
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const completedOrders = orders.filter((o) => o.status === "selesai").length
  const totalItems = stocksData.reduce((sum, s) => sum + s.stock, 0)
  const stockValue = stocksData.reduce((sum, s) => sum + s.stock * s.price, 0)

  const revenueByStatus = [
    { label: "Selesai", value: completedOrders, amount: orders.filter((o) => o.status === "selesai").reduce((s, o) => s + o.total, 0) },
    { label: "Diproses", value: orders.filter((o) => o.status === "diproses").length, amount: orders.filter((o) => o.status === "diproses").reduce((s, o) => s + o.total, 0) },
    { label: "Menunggu", value: orders.filter((o) => o.status === "menunggu").length, amount: orders.filter((o) => o.status === "menunggu").reduce((s, o) => s + o.total, 0) },
    { label: "Siap Diambil", value: orders.filter((o) => o.status === "siap-diambil").length, amount: orders.filter((o) => o.status === "siap-diambil").reduce((s, o) => s + o.total, 0) },
  ]

  const maxVal = Math.max(...weeklyData, 1)

  return (
    <div>
      <PageHeader title="Laporan" description="Ringkasan performa bisnis">
        <Button variant="outline" className="btn-blue-outline text-xs">
          <Download className="mr-1.5 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Total Pendapatan" value={formatPrice(totalRevenue)} variant="default" />
        <StatCard icon={TrendingUp} label="Pesanan Selesai" value={completedOrders} variant="success" />
        <StatCard icon={TrendingUp} label="Total Stok" value={totalItems} variant="default" />
        <StatCard icon={TrendingUp} label="Nilai Stok" value={formatPrice(stockValue)} variant="default" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="admin-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Grafik Pesanan Mingguan</h3>
          <div className="flex items-end gap-3" style={{ height: 160 }}>
            {weeklyData.map((val, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{val}</span>
                <div
                  className="w-full rounded bg-blue-400 transition-all duration-300"
                  style={{ height: `${(val / maxVal) * 130}px` }}
                />
                <span className="text-xs text-slate-400">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Pendapatan per Status</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueByStatus.map((item, idx) => (
                <TableRow key={item.label} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <TableCell><StatusBadge status={item.label === "Siap Diambil" ? "siap-diambil" : item.label.toLowerCase()} /></TableCell>
                  <TableCell className="text-slate-700">{item.value}</TableCell>
                  <TableCell className="font-medium">{formatPrice(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="admin-card mt-6 p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Ringkasan Pesanan</h3>
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { label: "Selesai", value: completedOrders, color: "bg-green-500", total: orders.length },
            { label: "Diproses", value: orders.filter((o) => o.status === "diproses").length, color: "bg-blue-400", total: orders.length },
            { label: "Menunggu", value: orders.filter((o) => o.status === "menunggu").length, color: "bg-amber-400", total: orders.length },
            { label: "Siap Diambil", value: orders.filter((o) => o.status === "siap-diambil").length, color: "bg-pink-400", total: orders.length },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-500">{item.label}</span>
                <span className="font-medium text-slate-800">{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / Math.max(item.total, 1)) * 100}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports
