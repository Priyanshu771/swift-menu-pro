import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopData, type ShopData, type MenuItem, type ShopInfo } from "@/context/ShopDataContext";

const ADMIN_PASSCODE = "adminFood@2025";

const emptyMenuItem: MenuItem = {
  id: "",
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  featured: false,
};

const Admin = () => {
  const { shopData, setShopData, resetToDefault } = useShopData();
  const STORAGE_KEY = "swiftMenuPro.shopData";
  const [authorized, setAuthorized] = useState<boolean>(() => {
    return sessionStorage.getItem("adminAuthorized") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [editing, setEditing] = useState<ShopData>(shopData);
  const [newItem, setNewItem] = useState<MenuItem>({ ...emptyMenuItem });

  useEffect(() => {
    setEditing(shopData);
  }, [shopData]);

  const handleAuthorize = () => {
    if (passcode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem("adminAuthorized", "true");
      setAuthorized(true);
    } else {
      alert("Invalid passcode");
    }
  };

  const handleSave = () => {
    // Ensure IDs are strings and unique
    const ids = new Set<string>();
    for (const item of editing.menuItems) {
      if (!item.id) {
        alert("All dishes must have an id");
        return;
      }
      if (ids.has(item.id)) {
        alert(`Duplicate id detected: ${item.id}`);
        return;
      }
      ids.add(item.id);
    }
    setShopData(editing);
    alert("Saved changes");
  };

  const handleReset = () => {
    if (confirm("Reset to default data? This will discard unsaved changes.")) {
      resetToDefault();
      setNewItem({ ...emptyMenuItem });
      alert("Reset complete");
    }
  };

  const updateShopInfo = (patch: Partial<ShopInfo>) => {
    setEditing((prev) => ({ ...prev, shopInfo: { ...prev.shopInfo, ...patch } }));
  };

  const updateItem = (index: number, patch: Partial<MenuItem>) => {
    setEditing((prev) => {
      const nextItems = [...prev.menuItems];
      nextItems[index] = { ...nextItems[index], ...patch };
      return { ...prev, menuItems: nextItems };
    });
  };

  const removeItem = (index: number) => {
    setEditing((prev) => {
      const nextItems = prev.menuItems.filter((_, i) => i !== index);
      return { ...prev, menuItems: nextItems };
    });
  };

  const addItem = () => {
    if (!newItem.id || !newItem.name) {
      alert("Please fill at least id and name for the new dish");
      return;
    }
    setEditing((prev) => ({ ...prev, menuItems: [...prev.menuItems, newItem] }));
    setNewItem({ ...emptyMenuItem });
  };

  // Utility actions to help move edits into repo JSON or reset local changes
  const exportJson = () => {
    try {
      const blob = new Blob([JSON.stringify(editing, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shopData-export.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to export JSON");
    }
  };

  const importJson = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || !parsed.shopInfo || !Array.isArray(parsed.menuItems)) {
          alert("Invalid JSON format. Expect { shopInfo, menuItems }.");
          return;
        }
        setShopData(parsed);
        setEditing(parsed);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } catch {}
        alert("Imported data and saved locally.");
      } catch (err) {
        alert("Could not parse JSON file");
      }
    };
    reader.readAsText(file);
  };

  const clearLocalEdits = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    resetToDefault();
    setEditing(shopData);
    alert("Cleared local edits. Reload to use repo JSON.");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="text-sm">Enter Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-md border p-2"
                placeholder="Passcode"
              />
              <Button className="w-full" onClick={handleAuthorize}>Unlock</Button>
              <p className="text-xs text-muted-foreground">
                Note: This is a simple client-side gate intended for local/admin-only use.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>Reset to default</Button>
            <Button variant="hero" onClick={handleSave}>Save changes</Button>
          </div>
        </div>

        {/* Helper actions to move data between localStorage and repo JSON */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button variant="outline" onClick={exportJson}>Export JSON</Button>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="file"
              accept="application/json"
              onChange={(e) => importJson(e.target.files?.[0])}
            />
            Import JSON
          </label>
          <Button variant="outline" onClick={clearLocalEdits}>Clear local edits</Button>
          <p className="text-xs text-muted-foreground">
            Export then paste into <code>src/data/shopData.json</code> and redeploy for global changes.
          </p>
        </div>

        <Tabs defaultValue="shop" className="w-full">
          <TabsList>
            <TabsTrigger value="shop">Shop Info</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
          </TabsList>

          <TabsContent value="shop" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shop Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Name</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.name} onChange={(e) => updateShopInfo({ name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">Tagline</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.tagline} onChange={(e) => updateShopInfo({ tagline: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm">Address</label>
                    <textarea className="w-full rounded-md border p-2" value={editing.shopInfo.address} onChange={(e) => updateShopInfo({ address: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">Phone</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.phone} onChange={(e) => updateShopInfo({ phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">WhatsApp</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.whatsapp} onChange={(e) => updateShopInfo({ whatsapp: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">Email</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.email} onChange={(e) => updateShopInfo({ email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">Opening Hours</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.openingHours} onChange={(e) => updateShopInfo({ openingHours: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm">Map Embed URL</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.mapEmbedUrl} onChange={(e) => updateShopInfo({ mapEmbedUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm">Facebook</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.socialMedia?.facebook ?? ""} onChange={(e) => updateShopInfo({ socialMedia: { ...(editing.shopInfo.socialMedia ?? {}), facebook: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-sm">Instagram</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.socialMedia?.instagram ?? ""} onChange={(e) => updateShopInfo({ socialMedia: { ...(editing.shopInfo.socialMedia ?? {}), instagram: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-sm">Twitter</label>
                    <input className="w-full rounded-md border p-2" value={editing.shopInfo.socialMedia?.twitter ?? ""} onChange={(e) => updateShopInfo({ socialMedia: { ...(editing.shopInfo.socialMedia ?? {}), twitter: e.target.value } })} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Existing Dishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {editing.menuItems.map((item, index) => (
                      <div key={item.id || index} className="grid grid-cols-1 md:grid-cols-6 gap-2 border rounded-md p-3">
                        <input className="rounded-md border p-2" value={item.id} onChange={(e) => updateItem(index, { id: e.target.value })} placeholder="ID" />
                        <input className="rounded-md border p-2" value={item.name} onChange={(e) => updateItem(index, { name: e.target.value })} placeholder="Name" />
                        <input className="rounded-md border p-2" value={item.description} onChange={(e) => updateItem(index, { description: e.target.value })} placeholder="Description" />
                        <input className="rounded-md border p-2" type="number" value={item.price} onChange={(e) => updateItem(index, { price: Number(e.target.value) })} placeholder="Price" />
                        <input className="rounded-md border p-2" value={item.image} onChange={(e) => updateItem(index, { image: e.target.value })} placeholder="Image slug (no .jpg)" />
                        <input className="rounded-md border p-2" value={item.category} onChange={(e) => updateItem(index, { category: e.target.value })} placeholder="Category" />
                        <div className="flex items-center gap-2">
                          <label className="text-sm">Featured</label>
                          <input type="checkbox" checked={item.featured} onChange={(e) => updateItem(index, { featured: e.target.checked })} />
                          <Button variant="outline" onClick={() => removeItem(index)}>Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add New Dish</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    <input className="rounded-md border p-2" value={newItem.id} onChange={(e) => setNewItem((n) => ({ ...n, id: e.target.value }))} placeholder="ID" />
                    <input className="rounded-md border p-2" value={newItem.name} onChange={(e) => setNewItem((n) => ({ ...n, name: e.target.value }))} placeholder="Name" />
                    <input className="rounded-md border p-2" value={newItem.description} onChange={(e) => setNewItem((n) => ({ ...n, description: e.target.value }))} placeholder="Description" />
                    <input className="rounded-md border p-2" type="number" value={newItem.price} onChange={(e) => setNewItem((n) => ({ ...n, price: Number(e.target.value) }))} placeholder="Price" />
                    <input className="rounded-md border p-2" value={newItem.image} onChange={(e) => setNewItem((n) => ({ ...n, image: e.target.value }))} placeholder="Image slug (no .jpg)" />
                    <input className="rounded-md border p-2" value={newItem.category} onChange={(e) => setNewItem((n) => ({ ...n, category: e.target.value }))} placeholder="Category" />
                    <div className="flex items-center gap-2 md:col-span-6">
                      <label className="text-sm">Featured</label>
                      <input type="checkbox" checked={newItem.featured} onChange={(e) => setNewItem((n) => ({ ...n, featured: e.target.checked }))} />
                      <Button variant="hero" onClick={addItem}>Add Dish</Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Place the matching image file (e.g. veg-burger.jpg) in src/assets.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;