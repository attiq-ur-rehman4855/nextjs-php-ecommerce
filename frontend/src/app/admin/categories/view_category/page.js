"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/admin/get_categories.php"
      );
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      setMsg("Error fetching categories.");
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure to delete this category?")) return;

    const formData = new FormData();
    formData.append("category_id", id);

    try {
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/admin/delete_category.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        fetchCategories(); // Refresh list
      }
    } catch (error) {
      setMsg("Error deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">All Categories</h2>

      {/* table container for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full bg-white rounded shadow mx-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Category Title</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.category_id} className="border-t hover:bg-gray-50">
                <td className="p-3">{cat.category_id}</td>
                <td className="p-3">{cat.category_title}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2 flex-nowrap">
                    {/* Edit Button */}
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300 text-sm md:text-base"
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
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm md:text-base"
                      onClick={() => deleteCategory(cat.category_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
