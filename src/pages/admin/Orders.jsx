import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import ordersData from "@/data/orders.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const statusFlow = ["menunggu", "diproses", "siap-diambil", "selesai"];

function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()),
  );

  const updateStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currentIndex = statusFlow.indexOf(o.status);
        const nextIndex = Math.min(currentIndex + 1, statusFlow.length - 1);
        return { ...o, status: statusFlow[nextIndex] };
      }),
    );
  };

  return (
    <div>
      <PageHeader title="Pesanan" description="Kelola semua pesanan pelanggan">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 rounded-lg border-slate-200 pl-9 text-sm"
          />
        </div>
      </PageHeader>

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Order</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Bouquet</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order, idx) => (
              <TableRow
                key={order.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <TableCell className="font-medium text-blue-600">
                  {order.id}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.bouquet}</TableCell>
                <TableCell className="text-slate-500">
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(order.total)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">
                  {order.status !== "selesai" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(order.id)}
                      className="btn-blue-outline text-xs"
                    >
                      <ChevronDown className="mr-1 h-3 w-3" />
                      {order.status === "menunggu"
                        ? "Proses"
                        : order.status === "diproses"
                          ? "Siap Diambil"
                          : "Selesaikan"}
                    </Button>
                  )}
                  {order.status === "selesai" && (
                    <span className="text-xs text-slate-400">Selesai</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-xl bg-white py-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">Tidak ada pesanan ditemukan.</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
