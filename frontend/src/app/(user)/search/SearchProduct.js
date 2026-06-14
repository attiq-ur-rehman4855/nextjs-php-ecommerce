"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      fetchResults(query);
    } else {
      setProducts([]);
    }
  }, [query]);

  const fetchResults = async (q) => {
    try {
      // Updated to AwardSpace User Area Endpoint
      const res = await fetch(
        `${BASE_URL}/user_area/api/get_search_results.php?query=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
        if (data.length === 0) {
          setMsg("");
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      setMsg("Failed to fetch search results.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Search Results for &quot;{query || ""}&quot;
      </h2>

      {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

      {products.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.product_id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 p-4 flex flex-col justify-between"
            >
              <div>
                {/* Updated to AwardSpace Admin Images Path */}
                <img
                  src={`${BASE_URL}/admin_area/admin_images/${prod.product_image1}`}
                  alt={prod.product_title}
                  className="w-full h-40 object-cover mb-4 rounded"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x200";
                  }}
                />
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 text-left">
                  {prod.product_title}
                </h3>
                <p className="text-green-600 font-bold mt-1 text-left">
                  Rs. {prod.product_price}
                </p>
              </div>
              
              <Link href={`/product_details/${prod.product_id}`}>
                <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition duration-200">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}