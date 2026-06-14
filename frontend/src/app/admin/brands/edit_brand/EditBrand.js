"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function EditBrand() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("id"); // URL: /admin/brands/edit?id=2

  const [brandTitle, setBrandTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (brandId) {
      // Updated to AwardSpace Admin Area Endpoint
      fetch(`${BASE_URL}/admin_area/api/get_single_brand.php?brand_id=${brandId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && data.brand_title) {
            setBrandTitle(data.brand_title);
          } else {
            setMsg("Brand not found.");
          }
        })
        .catch(() => {
          setMsg("Error fetching brand details.");
        });
    }
  }, [brandId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!brandTitle.trim()) {
      setMsg("Brand title cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("brand_id", brandId);
    formData.append("brand_title", brandTitle);

    try {
      // Updated to AwardSpace Admin Area Endpoint
      const res = await fetch(`${BASE_URL}/admin_area/api/update_brand.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.status === "success") {
        alert("Brand updated successfully");
        router.push("/admin/brands/view_brand"); // Clean immediate redirect
      } else {
        setMsg(data.message || "Failed to update brand.");
      }
    } catch (error) {
      setMsg("Error updating brand.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Edit Brand</h2>
        
        {msg && (
          <p className="text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded mb-4 border border-red-100">
            {msg}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Title
            </label>
            <input
              type="text"
              value={brandTitle}
              onChange={(e) => setBrandTitle(e.target.value)}
              required
              placeholder="Brand Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Update Brand
          </button>
        </form>
      </div>
    </div>
  );
}