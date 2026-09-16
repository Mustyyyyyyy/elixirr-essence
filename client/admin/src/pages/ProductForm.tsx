import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import type { Product, ProductImage } from "../types/product";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const imageUrl = (url: string) => url.startsWith("http") ? url : `${API_ORIGIN}${url}`;

const ProductForm = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", slug: "", price: "", category: "", shortDescription: "",
    description: "", stock: "0", materials: "", tags: "", images: [] as ProductImage[],
  });

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`)
      .then(({ data }: { data: Product }) => setForm({
        name: data.name, slug: data.slug, price: String(data.price),
        category: data.category, shortDescription: data.shortDescription,
        description: data.description, stock: String(data.stock),
        materials: data.materials, tags: data.tags.join(", "), images: data.images,
      }))
      .catch(() => setError("Unable to load this product."))
      .then(() => setLoading(false), () => setLoading(false));
  }, [id]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      if (editing) await api.put(`/products/${id}`, payload);
      else await api.post("/products", payload);
      navigate("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    setError("");
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("images", file));
    try {
      const { data } = await api.post("/upload/images", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedImages = data.urls.map((url: string) => ({
        id: crypto.randomUUID(),
        url,
        alt: form.name || "Product image",
      }));
      setForm((current) => ({ ...current, images: [...current.images, ...uploadedImages] }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to upload images.");
    } finally {
      event.target.value = "";
    }
  };

  const removeImage = (id: string) => {
    setForm((current) => ({ ...current, images: current.images.filter((image) => image.id !== id) }));
  };

  if (!isAuthenticated || loading) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/products" className="mb-4 inline-block text-blue-600 hover:text-blue-900">&larr; Back to Products</Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{editing ? "Edit Product" : "Add New Product"}</h1>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg bg-white p-6 shadow">
        {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["name", "Name", "text"], ["slug", "Slug", "text"], ["price", "Price", "number"],
            ["category", "Category", "text"], ["stock", "Stock", "number"], ["materials", "Materials", "text"],
          ].map(([field, label, type]) => (
            <label key={field} className="text-sm font-medium text-gray-700">
              {label}
              <input type={type} value={form[field as keyof typeof form] as string}
                onChange={(event) => updateField(field as keyof typeof form, event.target.value)}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                required={["name", "price", "category"].indexOf(field) !== -1} />
            </label>
          ))}
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Tags <span className="font-normal text-gray-500">(comma separated)</span>
          <input value={form.tags} onChange={(event) => updateField("tags", event.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Short description
          <input value={form.shortDescription} onChange={(event) => updateField("shortDescription", event.target.value)} className="mt-1 w-full rounded border border-gray-300 px-3 py-2" required />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} className="mt-1 min-h-32 w-full rounded border border-gray-300 px-3 py-2" required />
        </label>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product images
            <input type="file" accept="image/*" multiple onChange={handleImages} className="mt-1 block w-full rounded border border-gray-300 px-3 py-2" />
          </label>
          {form.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {form.images.map((image) => (
                <div key={image.id} className="relative">
                  <img src={imageUrl(image.url)} alt={image.alt} className="h-28 w-full rounded object-cover" />
                  <button type="button" onClick={() => removeImage(image.id)} className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Link to="/products" className="rounded border border-gray-300 px-4 py-2">Cancel</Link>
          <button type="submit" disabled={saving} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
            {saving ? "Saving..." : editing ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
