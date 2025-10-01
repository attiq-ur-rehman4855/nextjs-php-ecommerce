"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditBrand() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("id"); // URL: /admin/brands/edit?id=2

  const [brandTitle, setBrandTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (brandId) {
      fetch(`https://shop-sphere.infinityfreeapp.com/api/admin/get_single_brand.php?brand_id=${brandId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setBrandTitle(data.brand_title);
          } else {
            setMsg("Brand not found.");
          }
        });
    }
  }, [brandId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand_id", brandId);
    formData.append("brand_title", brandTitle);

    try {
      const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/update_brand.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMsg(data.message);

      if (data.status === "success") {
        alert("Brand updated successfully")
        setTimeout(() => {
          router.push("/admin/brands/view_brand"); // redirect back to view categories
        }, 500);
      }
    } catch (error) {
      setMsg("Error updating brand.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Edit Brand</h2>
        {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={brandTitle}
            onChange={(e) => setBrandTitle(e.target.value)}
            required
            placeholder="Brand Title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Update Brand
          </button>
        </form>
      </div>
    </div>
  );
}
