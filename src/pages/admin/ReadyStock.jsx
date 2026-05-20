import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import bouquetsData from "@/data/bouquets.json";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function ReadyStock() {
  const [items, setItems] = useState(
    bouquetsData
      .filter((b) => b.category !== "Custom")
      .map((b) => ({
        id: b.id,
        name: b.name,
        category: b.category,
        price: b.price,
        status: b.stockStatus,
      })),
  );

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    status: "ready",
  });

  const statusOptions = [
    { value: "ready", label: "Ready", class: "bg-green-50 text-green-600" },
    {
      value: "hampir-habis",
      label: "Hampir Habis",
      class: "bg-yellow-50 text-yellow-600",
    },
    { value: "habis", label: "Habis", class: "bg-red-50 text-red-600" },
  ];

  const updateStatus = (id, newStatus) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)),
    );
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      status: item.status,
    });
  };

  const saveEdit = () => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === editingId
          ? {
              ...i,
              name: editForm.name,
              category: editForm.category,
              price: Number(editForm.price),
              status: editForm.status,
            }
          : i,
      ),
    );
    setEditingId(null);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        name: "bouquet Baru",
        category: "Custom",
        price: 0,
        status: "ready",
      },
    ]);
    startEdit({
      id: newId,
      name: "bouquet Baru",
      category: "Custom",
      price: 0,
      status: "ready",
    });
  };

  return (
    <div>
      <PageHeader
        title="Ready Stock"
        description="Kelola stok bouquet yang tersedia di studio"
      >
        <Button onClick={addItem} className="btn-blue">
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah bouquet
        </Button>
      </PageHeader>

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama bouquet</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow
                key={item.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <TableCell className="font-medium text-slate-800">
                  {item.name}
                </TableCell>
                <TableCell className="text-slate-500">
                  {item.category}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(item.price)}
                </TableCell>
                <TableCell>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className="rounded-lg border border-slate-200 bg-transparent px-2 py-1 text-xs font-medium focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog
                      open={editingId === item.id}
                      onOpenChange={(open) => !open && setEditingId(null)}
                    >
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-slate-400 hover:text-blue-500"
                        onClick={() => startEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit bouquet</DialogTitle>
                          <DialogDescription>
                            Ubah informasi bouquet ready stock.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Nama bouquet
                            </label>
                            <Input
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  name: e.target.value,
                                }))
                              }
                              className="rounded-lg border-slate-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Kategori
                            </label>
                            <Input
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  category: e.target.value,
                                }))
                              }
                              className="rounded-lg border-slate-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Harga (IDR)
                            </label>
                            <Input
                              type="number"
                              value={editForm.price}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  price: e.target.value,
                                }))
                              }
                              className="rounded-lg border-slate-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Status
                            </label>
                            <select
                              value={editForm.status}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  status: e.target.value,
                                }))
                              }
                              className="w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            >
                              {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="rounded-lg border-slate-200"
                            >
                              Batal
                            </Button>
                          </DialogClose>
                          <Button onClick={saveEdit} className="btn-blue">
                            Simpan
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-slate-400 hover:text-red-500"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ReadyStock;
