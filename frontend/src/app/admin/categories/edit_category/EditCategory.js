"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function EditCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id"); // URL: /admin/categories/edit?id=2

  const [categoryTitle, setCategoryTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (categoryId) {
      // Updated to AwardSpace Admin Area Endpoint
      fetch(`${BASE_URL}/admin_area/api/get_single_category.php?category_id=${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && data.category_title) {
            setCategoryTitle(data.category_title);
          } else {
            setMsg("Category not found.");
          }
        })
        .catch(() => {
          setMsg("Error fetching category details.");
        });
    }
  }, [categoryId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!categoryTitle.trim()) {
      setMsg("Category title cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("category_title", categoryTitle);

    try {
      // Updated to AwardSpace Admin Area Endpoint
      const res = await fetch(`${BASE_URL}/admin_area/api/update_category.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status === "success") {
        alert("Category updated successfully");
        router.push("/admin/categories/view_category"); // Direct seamless push
      } else {
        setMsg(data.message || "Failed to update category.");
      }
    } catch (error) {
      setMsg("Error updating category.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Edit Category</h2>
        
        {msg && (
          <p className="text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded mb-4 border border-red-100">
            {msg}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Title
            </label>
            <input
              type="text"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              required
              placeholder="Category Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}