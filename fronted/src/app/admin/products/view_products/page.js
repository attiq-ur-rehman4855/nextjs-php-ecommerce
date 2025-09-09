"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // for routing

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter(); // router hook

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 1000); // 1 second

      return () => clearTimeout(timer); // cleanup
    }
  }, [msg]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/get_products.php"
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setMsg("Error fetching products.");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const formData = new FormData();
    formData.append("product_id", id);

    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/delete_product.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        fetchProducts(); // Refresh list
      }
    } catch (error) {
      setMsg("Error deleting product.");
    }
  };

  // Edit button logic
  const editProduct = (id) => {
    router.push(`/admin/products/edit_product?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow min-w-[600px]">
          <thead className="bg-gray-200">
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
                    src={`http://localhost/ecommerce-nextjs/admin_area/product_images/${prod.product_image1}`}
                    alt={prod.product_title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 text-sm"
                    onClick={() => editProduct(prod.product_id)} // redirect logic here
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

      {msg && (
        <p className="mt-4 text-center text-red-500 font-medium">{msg}</p>
      )}
    </div>
  );
}
