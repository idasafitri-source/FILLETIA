import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const products = [
  { id: 1, name: "Fillet Nila", price: 25000 },
  { id: 2, name: "Fillet Gurame", price: 35000 },
  { id: 3, name: "Fillet Kembung", price: 20000 },
  { id: 4, name: "Fillet Kakap", price: 40000 },
];

const spices = [
  "Bumbu Bakar",
  "Bumbu Kuah Kuning",
  "Bumbu Marinasi",
  "Bumbu Pepes",
];

export default function FilletiaApp() {
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", review: "" });

  const addToCart = (product, spice) => {
    if (spice !== "Pilih Bumbu") {
      setCart([...cart, { ...product, spice }]);
    }
  };

  const handleReviewSubmit = () => {
    setReviews([...reviews, form]);
    setForm({ name: "", review: "" });
  };

  const getRecommendation = () => {
    if (cart.length === 0) return "Belum ada rekomendasi";
    const spiceCount = {};
    cart.forEach((item) => {
      spiceCount[item.spice] = (spiceCount[item.spice] || 0) + 1;
    });
    return Object.keys(spiceCount).reduce((a, b) =>
      spiceCount[a] > spiceCount[b] ? a : b
    );
  };

  return (
    <div className="p-6 min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold">Filletia</h1>
        <p>Penjualan Ikan Fillet dengan Bumbu Rempah & AI Recommendation</p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {products.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-md border-orange-200">
            <CardContent className="p-4">
              <h2 className="font-semibold text-orange-600">{product.name}</h2>
              <p className="text-gray-700">Rp {product.price}</p>

              <select
                className="border border-orange-300 p-1 mt-2 rounded w-full"
                onChange={(e) => addToCart(product, e.target.value)}
              >
                <option>Pilih Bumbu</option>
                {spices.map((spice, i) => (
                  <option key={i}>{spice}</option>
                ))}
              </select>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendation */}
      <Card className="mt-6 rounded-2xl shadow-md border-orange-200">
        <CardContent className="p-4">
          <h2 className="font-semibold text-orange-600">AI Recommendation</h2>
          <p>Rekomendasi bumbu favorit: {getRecommendation()}</p>
        </CardContent>
      </Card>

      {/* Order Section */}
      <Card className="mt-6 rounded-2xl shadow-md border-orange-200">
        <CardContent className="p-4">
          <h2 className="font-semibold text-orange-600">Pemesanan</h2>
          <div className="flex gap-2 mt-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Delivery Order</Button>
            <Button className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-100">Pre Order</Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Section */}
      <Card className="mt-6 rounded-2xl shadow-md border-orange-200">
        <CardContent className="p-4 grid gap-2">
          <h2 className="font-semibold text-orange-600">Review Produk</h2>
          <Input
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-orange-300"
          />
          <Textarea
            placeholder="Tulis review..."
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            className="border-orange-300"
          />
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleReviewSubmit}>
            Kirim
          </Button>

          <div>
            {reviews.map((r, i) => (
              <div key={i} className="border border-orange-200 p-2 mt-2 rounded">
                <strong className="text-orange-600">{r.name}</strong>
                <p>{r.review}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
