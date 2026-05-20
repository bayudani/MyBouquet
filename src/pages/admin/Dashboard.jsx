import { useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCheck,
  Sparkles,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ordersData from "@/data/orders.json";
import customRequestsData from "@/data/customRequests.json";
import bouquets from "@/data/bouquets.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function Dashboard() {
  const [orders] = useState(ordersData);
  const readyToday = bouquets.filter(
    (b) => b.stockStatus === "ready" || b.stockStatus === "hampir-habis",
  ).length;

  const total = orders.length;
  const menunggu = orders.filter((o) => o.status === "menunggu").length;
  const diproses = orders.filter((o) => o.status === "diproses").length;
  const selesai = orders.filter((o) => o.status === "selesai").length;
  const customRequests = customRequestsData.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lastMonthOrders = 18;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const trendPct = (current, previous) => {
    if (!previous) return "+0%";
    const diff = (((current - previous) / previous) * 100).toFixed(0);
    return diff.startsWith("-") ? `${diff}%` : `+${diff}%`;
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan bisnis bouquet Anda"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={ShoppingBag}
          label="Total Pesanan"
          value={total}
          trend={trendPct(total, lastMonthOrders)}
          variant="default"
        />
        <StatCard
          icon={Clock}
          label="Menunggu"
          value={menunggu}
          trend={trendPct(menunggu, 3)}
          variant="default"
        />
        <StatCard
          icon={TrendingUp}
          label="Diproses"
          value={diproses}
          trend={trendPct(diproses, 2)}
          variant="default"
        />
        <StatCard
          icon={CheckCheck}
          label="Selesai"
          value={selesai}
          trend={trendPct(selesai, 8)}
          variant="success"
        />
        <StatCard
          icon={Sparkles}
          label="Ready Hari Ini"
          value={readyToday}
          variant="default"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="admin-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Pesanan Terbaru
              </h3>
              <p className="text-xs text-slate-400">5 pesanan terakhir</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1">
              <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-medium text-blue-600">
                {customRequests} Permintaan Custom
              </span>
            </div>
          </div>
          <div className="p-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Order</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order, idx) => (
                  <TableRow
                    key={order.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  >
                    <TableCell className="font-medium text-blue-600">
                      {order.id}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="admin-card">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-800">
              Ringkasan Pendapatan
            </h3>
            <p className="text-xs text-slate-400">Total pemasukan</p>
          </div>
          <div className="p-5">
            <p className="text-3xl font-bold text-slate-800">
              {formatPrice(totalRevenue)}
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Pesanan Selesai</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">{selesai}</span>
                  <span className="text-xs text-green-500">
                    {((selesai / total) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-green-500"
                  style={{ width: `${(selesai / total) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Menunggu</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">{menunggu}</span>
                  <span className="text-xs text-amber-500">
                    {((menunggu / total) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-amber-400"
                  style={{ width: `${(menunggu / total) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Diproses</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">{diproses}</span>
                  <span className="text-xs text-blue-500">
                    {((diproses / total) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-blue-400"
                  style={{ width: `${(diproses / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
