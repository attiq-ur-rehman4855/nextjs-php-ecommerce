"use client";
import { useState, useEffect } from "react";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image1: null,
    image2: null,
    image3: null,
    category: "",
    brand: "",
    keywords: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Categories
    fetch(`${BASE_URL}/admin_area/api/get_categories.php`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch Brands
    fetch(`${BASE_URL}/admin_area/api/get_brands.php`)
      .then((res) => res.json())
      .then((data) => setBrands(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }

    try {
      const res = await fetch(
        `${BASE_URL}/admin_area/api/insert_product.php`,
        {
          method: "POST",
          body: productData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        alert("Product added successfully");
        setFormData({
          title: "",
          description: "",
          price: "",
          image1: null,
          image2: null,
          image3: null,
          category: "",
          brand: "",
          keywords: "",
        });
      }
    } catch (error) {
      setMsg("Error adding product. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-4 max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
          Add New Product
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Image Uploads */}
        {[1, 2, 3].map((num) => (
          <div key={num}>
            <label
              htmlFor={`image${num}`}
              className="block w-full cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 rounded-md p-2 text-center hover:bg-gray-200"
            >
              {formData[`image${num}`] ? formData[`image${num}`].name : `Upload Image ${num}`}
            </label>
            <input
              id={`image${num}`}
              type="file"
              name={`image${num}`}
              accept="image/*"
              onChange={handleChange}
              required
              className="hidden"
            />
          </div>
        ))}

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_title}
            </option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_title}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="keywords"
          placeholder="Keywords (comma separated)"
          value={formData.keywords}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 font-semibold"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        {msg && (
          <p className={`text-center font-medium ${msg.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}