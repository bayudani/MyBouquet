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

function GalleryManagement() {
  const [items, setItems] = useState(bouquetsData);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
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
              description: editForm.description,
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
    const newItem = {
      id: newId,
      name: "Buket Baru",
      category: "Custom",
      price: 0,
      description: "Deskripsi buket baru",
      image:
        "https://antaeusflowers.com.au/wp-content/uploads/2025/06/a1_Classic1-300x300.jpg",
      images: [
        "https://antaeusflowers.com.au/wp-content/uploads/2025/06/a1_Classic1-300x300.jpg",
      ],
      flowers: ["Bunga Pilihan"],
      available: true,
      rating: 5.0,
      stockStatus: "ready",
    };
    setItems((prev) => [...prev, newItem]);
    startEdit(newItem);
  };

  return (
    <div>
      <PageHeader title="Galeri" description="Kelola koleksi buket di galeri">
        <Button onClick={addItem} className="btn-blue">
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah Buket
        </Button>
      </PageHeader>

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-slate-800">
                  {item.name}
                </TableCell>
                <TableCell className="text-slate-500">
                  {item.category}
                </TableCell>
                <TableCell className="font-medium">
                  {item.price > 0 ? formatPrice(item.price) : "Custom"}
                </TableCell>
                <TableCell className="text-slate-500">{item.rating}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
                      item.available
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.available ? "Tersedia" : "Tidak"}
                  </span>
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
                          <DialogTitle>Edit Buket</DialogTitle>
                          <DialogDescription>
                            Ubah informasi buket di galeri.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Nama Buket
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
                              Deskripsi
                            </label>
                            <textarea
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm((f) => ({
                                  ...f,
                                  description: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="rounded-lg border-slate-200">
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

export default GalleryManagement;
