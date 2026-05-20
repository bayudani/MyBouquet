import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import customRequestsData from "@/data/customRequests.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function CustomRequests() {
  const [requests, setRequests] = useState(customRequestsData);

  const updateStatus = (id) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next =
          r.status === "pending"
            ? "reviewed"
            : r.status === "reviewed"
              ? "completed"
              : r.status;
        return { ...r, status: next };
      }),
    );
  };

  return (
    <div>
      <PageHeader
        title="Permintaan Custom"
        description="Permintaan desain Bouquet dari pelanggan"
      />

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Request</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Acara</TableHead>
              <TableHead>Tema</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req, idx) => (
              <TableRow
                key={req.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <TableCell className="font-medium text-blue-600">
                  {req.id}
                </TableCell>
                <TableCell>{req.name}</TableCell>
                <TableCell>{req.occasion}</TableCell>
                <TableCell
                  className="max-w-[150px] truncate text-slate-500"
                  title={req.theme}
                >
                  {req.theme}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(req.budget)}
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(req.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={
                      req.status === "pending"
                        ? "pending"
                        : req.status === "reviewed"
                          ? "reviewed"
                          : "completed"
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  {req.status !== "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(req.id)}
                      className="btn-blue-outline text-xs"
                    >
                      {req.status === "pending" ? "Tinjau" : "Selesaikan"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CustomRequests;
