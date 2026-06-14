"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin_area/api/get_products.php`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setMsg("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const formData = new FormData();
    formData.append("product_id", id);

    try {
      const res = await fetch(`${BASE_URL}/admin_area/api/delete_product.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        fetchProducts();
      }
    } catch (error) {
      setMsg("Error deleting product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">All Products</h2>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.product_id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{prod.product_id}</td>
                  <td className="p-3">{prod.product_title}</td>
                  <td className="p-3">Rs. {prod.product_price}</td>
                  <td className="p-3">
                    <img
                      src={`${BASE_URL}/admin_area/product_images/${prod.product_image1}`}
                      alt={prod.product_title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 text-sm"
                      onClick={() => router.push(`/admin/products/edit_product?id=${prod.product_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm"
                      onClick={() => deleteProduct(prod.product_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {msg && (
        <p className="mt-4 text-center text-red-600 font-medium bg-red-50 py-2 rounded">
          {msg}
        </p>
      )}
    </div>
  );
}