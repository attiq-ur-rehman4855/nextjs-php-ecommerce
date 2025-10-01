"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/admin/get_products.php"
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setMsg("Error fetching products.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Our Products
      </h2>

      {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            key={prod.product_id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 p-4 cursor-pointer"
          >
            <img
              src={`https://shop-sphere.infinityfreeapp.com/api/admin/product_images/${prod.product_image1}`}
              alt={prod.product_title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {prod.product_title}
            </h3>
            <p className="text-green-600 font-bold text-md mb-2">
              Rs. {prod.product_price}
            </p>
            <Link href={`/product_details/${prod.product_id}`}>
              <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition duration-200">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
