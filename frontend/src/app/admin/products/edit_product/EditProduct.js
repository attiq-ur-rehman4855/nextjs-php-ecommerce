"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    image1: null,
    image2: null,
    image3: null,
    category_id: "",
    brand_id: "",
    keywords: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://shop-sphere.infinityfreeapp.com/api/admin/get_single_product.php?id=${id}`);
      const data = await res.json();
      setFormData({
        title: data.product_title,
        desc: data.product_desc,
        price: data.product_price,
        image1: null,
        image2: null,
        image3: null,
        category_id: data.category_id,
        brand_id: data.brand_id,
        keywords: data.product_keywords,
      });
    } catch (error) {
      setMsg("Error fetching product details.");
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/get_categories.php");
    const data = await res.json();
    setCategories(data);
  };

  const fetchBrands = async () => {
    const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/get_brands.php");
    const data = await res.json();
    setBrands(data);
  };

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
    const data = new FormData();
    data.append("id", id);
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("image1", formData.image1);
    data.append("image2", formData.image2);
    data.append("image3", formData.image3);
    data.append("category_id", formData.category_id);
    data.append("brand_id", formData.brand_id);
    data.append("keywords", formData.keywords);

    const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/admin/update_product.php", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setMsg(result.message);
    if (result.status === "success") {
      alert("Product updated successfully!");
      setTimeout(() => router.push("/admin/products/view_products"), 500);
    }


  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Edit Product</h2>
        {msg && <p className="text-center text-red-500 mb-4">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Product Title" className="w-full p-2 border rounded" required />
          <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Product Description" className="w-full p-2 border rounded" required />

          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />

          <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>{cat.category_title}</option>
            ))}
          </select>

          <select name="brand_id" value={formData.brand_id} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_title}</option>
            ))}
          </select>

          <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords" className="w-full p-2 border rounded" />

          <label>Change Image 1:</label>
          <input type="file" name="image1" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded bg-white" />
          <label>Change Image 2:</label>
          <input type="file" name="image2" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded bg-white" />
          <label>Change Image 3:</label>
          <input type="file" name="image3" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded bg-white" />

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded">Update Product</button>
        </form>
      </div>
    </div>
  );
}
