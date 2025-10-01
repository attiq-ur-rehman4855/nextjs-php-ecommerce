"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id"); // URL: /admin/categories/edit?id=2

  const [categoryTitle, setCategoryTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (categoryId) {
      fetch(`https://shop-sphere.infinityfreeapp.com/api/admin/get_single_category.php?category_id=${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setCategoryTitle(data.category_title);
          } else {
            setMsg("Category not found.");
          }
        });
    }
  }, [categoryId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("category_title", categoryTitle);

    try {
      const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/update_category.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMsg(data.message);

      if (data.status === "success") {
        alert("Category updated successfully");
        setTimeout(() => {
          router.push("/admin/categories/view_category"); // redirect back to view categories
        }, 500);
      }
    } catch (error) {
      setMsg("Error updating category.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Edit Category</h2>
        {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            required
            placeholder="Category Title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}
