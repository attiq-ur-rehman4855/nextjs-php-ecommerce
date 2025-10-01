"use client";
import { useEffect, useState } from "react";

export default function AddCategory() {
  const [brandTitle, setBrandTitle] = useState("");
  const [message, setMessage] = useState("");


  
  useEffect(() => {
    if (message) {
      alert(message);
      setMessage(""); // Clear the message after showing alert
    }
  }, [message]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandTitle.trim()) {
      setMessage("Brand title cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("brand_title", brandTitle);

    try {
      const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/add_brand.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.status === "success") {
        setBrandTitle(""); // clear input
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Add New Brand</h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand_title"
            placeholder="Enter Brand Title"
            value={brandTitle}
            onChange={(e) => setBrandTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
}
