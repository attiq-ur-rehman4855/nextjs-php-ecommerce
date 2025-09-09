"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ViewBrands() {
  const [brands, setBrands] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(""); 
      }, 1000); 

      return () => clearTimeout(timer); // cleanup
    }
  }, [msg]);

  const fetchBrands = async () => {
    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/get_brands.php"
      );
      const data = await res.json();
      setBrands(data);
    } catch (error) {
      setMsg("Error fetching brands.");
    }
  };

  const deleteBrand = async (id) => {
    if (!confirm("Are you sure to delete this brand?")) return;

    const formData = new FormData();
    formData.append("brand_id", id);

    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/delete_brand.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        fetchBrands(); // Refresh list
      }
    } catch (error) {
      setMsg("Error deleting brand.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
          All Brands
        </h2>

        {msg && (
          <p className="mb-4 text-center text-red-500 font-medium">{msg}</p>
        )}

        {/* ✅ Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 sm:px-3 py-2 text-left">ID</th>
                <th className="px-2 sm:px-3 py-2 text-left">Brand Title</th>
                <th className="px-2 sm:px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr
                  key={brand.brand_id}
                  className="border-t hover:bg-gray-50 text-sm sm:text-base"
                >
                  <td className="px-2 sm:px-3 py-2">{brand.brand_id}</td>
                  <td className="px-2 sm:px-3 py-2">{brand.brand_title}</td>
                  <td className="px-2 sm:px-3 py-2 flex gap-2 flex-nowrap">
                    {/* Edit Button */}
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300"
                      onClick={() =>
                        router.push(
                          `/admin/brands/edit_brand?id=${brand.brand_id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                      onClick={() => deleteBrand(brand.brand_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
