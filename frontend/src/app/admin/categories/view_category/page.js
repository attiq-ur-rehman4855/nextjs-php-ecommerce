"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [msg]);

  const fetchCategories = async () => {
    try {
      // Updated to AwardSpace Admin Area Endpoint
      const res = await fetch(
        `${BASE_URL}/admin_area/api/get_categories.php`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setMsg("Error fetching categories.");
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure to delete this category?")) return;

    const formData = new FormData();
    formData.append("category_id", id);

    try {
      // Updated to AwardSpace Admin Area Endpoint
      const res = await fetch(
        `${BASE_URL}/admin_area/api/delete_category.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        fetchCategories(); // Refresh list automatically
      }
    } catch (error) {
      setMsg("Error deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
          All Categories
        </h2>

        {msg && (
          <p className="mb-4 text-center text-red-500 font-medium">{msg}</p>
        )}

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Category Title</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.category_id} className="border-t hover:bg-gray-50 text-sm sm:text-base">
                  <td className="p-3 text-left">{cat.category_id}</td>
                  <td className="p-3 text-left">{cat.category_title}</td>
                  <td className="p-3 text-left">
                    <div className="flex items-center space-x-2 flex-nowrap justify-start">
                      {/* Edit Button */}
                      <button
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 text-black text-xs sm:text-sm font-medium transition duration-150"
                        onClick={() =>
                          router.push(
                            `/admin/categories/edit_category?id=${cat.category_id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-xs sm:text-sm font-medium transition duration-150"
                        onClick={() => deleteCategory(cat.category_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No categories found
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