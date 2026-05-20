import { useState } from "react";
import { Search, Package, AlertCircle } from "lucide-react";
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
import OrderTimeline from "@/components/OrderTimeline";
import StatusBadge from "@/components/StatusBadge";
import orders from "@/data/orders.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function Tracking() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const found = orders.find(
      (o) => o.id.toLowerCase() === orderId.trim().toLowerCase(),
    );
    setOrder(found || null);
  };

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Tracking Pesanan"
          title="Cek Status Pesanan Anda"
          description="Masukkan ID Order untuk melihat status terbaru pesanan Anda."
        />

        <div className="mx-auto max-w-lg">
          <Card className="rounded-3xl border border-pink-200 p-6 shadow-sm sm:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="h-5 w-5 text-pink-400" />
                Cari Pesanan
              </CardTitle>
              <CardDescription>
                Masukkan ID Order (cth: ORD-001)
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <form onSubmit={handleSearch} className="flex gap-3">
                <Input
                  placeholder="Masukkan ID Order..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="rounded-xl border-pink-200"
                />
                <Button type="submit" className="btn-pink">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {searched && (
            <div className="mt-6">
              {order ? (
                <Card className="rounded-3xl border border-pink-200 p-6 shadow-sm sm:p-8">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{order.id}</CardTitle>
                      <StatusBadge status={order.status} />
                    </div>
                    <CardDescription>
                      Pesanan dibuat pada{" "}
                      {new Date(order.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-0 pb-0">
                    <div className="grid gap-4 rounded-2xl bg-pink-soft p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-400">Pelanggan</p>
                        <p className="text-sm font-medium text-slate-800">
                          {order.customer}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Bouquet</p>
                        <p className="text-sm font-medium text-slate-800">
                          {order.bouquet}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="text-sm font-bold text-pink-400">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-sm font-semibold text-slate-800">
                        Progress Pesanan
                      </p>
                      <OrderTimeline currentStatus={order.status} />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-2xl bg-red-50 p-6 text-center">
                  <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-400" />
                  <p className="font-medium text-red-600">
                    Pesanan Tidak Ditemukan
                  </p>
                  <p className="mt-1 text-sm text-red-500">
                    Tidak ada pesanan dengan ID &ldquo;{orderId}&rdquo;. Silakan
                    periksa kembali ID Order Anda.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracking;
