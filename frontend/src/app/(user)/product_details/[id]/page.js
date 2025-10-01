"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../context/authContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, userId, fetchCartCount } = useAuth();
  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(
        `https://shop-sphere.infinityfreeapp.com/api/user/get_product_details.php?id=${id}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setMainImage(data.product_image1); // default main image
      }
    } catch (err) {
      setError("Error fetching product details");
    }
  };

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  // Add_to_cart functionality start here

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("product_id", id);
    formData.append("quantity", 1);

    try {
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/user/add_to_cart.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.status === "already_exists") {
        alert("Item already exists in the cart");
      } else if (data.status === "success" || data.status === "updated") {
        fetchCartCount(userId); // update count in navbar in authContext
        alert("Item successfully added to your cart");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      alert("Failed to add item to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Left: Main Image + Thumbnails */}
        <div className="md:w-1/2">
          <img
            src={`https://shop-sphere.infinityfreeapp.com/api/admin/product_images/${mainImage}`}
            alt="Main Product"
            className="w-full h-[350px] object-cover rounded mb-4"
          />
          <div className="flex gap-4">
            {[
              product.product_image1,
              product.product_image2,
              product.product_image3,
            ].map((img, index) => (
              <img
                key={index}
                src={`https://shop-sphere.infinityfreeapp.com/api/admin/product_images/${img}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-15 h-15 object-cover rounded cursor-pointer border border-gray-300 hover:border-yellow-400"
                onMouseEnter={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {product.product_title}
          </h2>
          <p className="text-lg font-semibold text-green-600">
            Rs. {product.product_price}
          </p>

          <p className="text-gray-700 mt-4">{product.product_desc}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Category:</span>{" "}
            {product.category_title}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Brand:</span> {product.brand_title}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded mt-5 transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
