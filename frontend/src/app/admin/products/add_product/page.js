"use client";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    // Fetch Categories
    fetch("http://localhost/ecommerce-nextjs/admin_area/api/get_categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // Fetch Brands
    fetch("http://localhost/ecommerce-nextjs/admin_area/api/get_brands.php")
      .then((res) => res.json())
      .then((data) => setBrands(data));
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

    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }

    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/insert_product.php",
        {
          method: "POST",
          body: productData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        alert("Product added successfully");
        // Clear form
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
        setMsg("");
      }
    } catch (error) {
      setMsg("Error adding product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 max-w-lg mx-auto"
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
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Images Upload */}
        {/* Image Upload - Custom Button */}
        <div>
          <label
            htmlFor="image1"
            className="block w-full cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 rounded-md p-2 text-center hover:bg-gray-200"
          >
            {formData.image1 ? formData.image1.name : "Upload Image 1"}
          </label>
          <input
            id="image1"
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleChange}
            required
            className="hidden"
          />
        </div>

        <div>
          <label
            htmlFor="image2"
            className="block w-full cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 rounded-md p-2 text-center hover:bg-gray-200"
          >
            {formData.image2 ? formData.image2.name : "Upload Image 2"}
          </label>
          <input
            id="image2"
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleChange}
            required
            className="hidden"
          />
        </div>

        <div>
          <label
            htmlFor="image3"
            className="block w-full cursor-pointer bg-gray-100 border border-gray-300 text-gray-700 rounded-md p-2 text-center hover:bg-gray-200"
          >
            {formData.image3 ? formData.image3.name : "Upload Image 3"}
          </label>
          <input
            id="image3"
            type="file"
            name="image3"
            accept="image/*"
            onChange={handleChange}
            required
            className="hidden"
          />
        </div>

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add Product
        </button>

        {msg && <p className="text-center text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
