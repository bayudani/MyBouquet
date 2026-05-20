import { useState } from "react"
import { Plus, Minus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/PageHeader"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import stocksData from "@/data/stocks.json"

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price)
}

function Stock() {
  const [stocks, setStocks] = useState(stocksData)

  const adjustStock = (id, delta) => {
    setStocks((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const newStock = Math.max(0, s.stock + delta)
        return { ...s, stock: newStock }
      })
    )
  }

  const lowStock = stocks.filter((s) => s.stock <= s.minStock)

  return (
    <div>
      <PageHeader title="Stok Bunga" description="Kelola inventaris bunga dan perlengkapan" />

      {lowStock.length > 0 && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <p className="text-sm font-medium text-red-600">
            {lowStock.length} item di bawah stok minimum. Segera lakukan pemesanan ulang.
          </p>
        </div>
      )}

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Min. Stok</TableHead>
              <TableHead>Harga Satuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((item, idx) => (
              <TableRow key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <TableCell className="font-medium text-slate-800">{item.name}</TableCell>
                <TableCell className="text-slate-500">{item.category}</TableCell>
                <TableCell>
                  <span className={`font-medium ${item.stock <= item.minStock ? "text-red-500" : "text-green-600"}`}>
                    {item.stock}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">{item.unit}</TableCell>
                <TableCell className="text-slate-500">{item.minStock}</TableCell>
                <TableCell className="font-medium">{formatPrice(item.price)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                      item.stock <= item.minStock
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {item.stock <= item.minStock ? "Stok Rendah" : "Tersedia"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => adjustStock(item.id, -1)}
                      disabled={item.stock <= 0}
                      className="rounded-lg border-slate-200"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => adjustStock(item.id, 1)}
                      className="rounded-lg border-slate-200"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Stock
