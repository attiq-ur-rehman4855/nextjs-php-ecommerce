"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import feature_image from "../../../public/feature_image.jpg";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/user_area/api/get_home_products.php"
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching home products:", error);
    }
  };

  return (
    <>
      <section className="w-full py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-4 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold">
              Upgrade Your Shopping Experience
            </h1>
            <p className="text-lg text-gray-300">
              Discover trending gadgets, fashion, and daily essentials — all at
              unbeatable prices.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("products-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded"
            >
              Shop Now
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded shadow-lg overflow-hidden">
              <Image
                src={feature_image}
                alt="Featured Product"
                width={800}
                height={500}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <div>
        {/* Hero Section */}
        <div className="bg-yellow-400 text-center p-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Our Store!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Best Products, Best Prices
          </p>
        </div>

        {/* Products Section */}
        <div id="products-section" className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Latest Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.product_id}
                className="bg-white rounded shadow p-4 hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                <img
                  src={`http://localhost/ecommerce-nextjs/admin_area/product_images/${prod.product_image1}`}
                  alt={prod.product_title}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {prod.product_title}
                </h3>
                <p className="text-indigo-600 font-bold mt-2">
                  Rs. {prod.product_price}
                </p>

                <Link href={`/product_details/${prod.product_id}`}>
                  <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
