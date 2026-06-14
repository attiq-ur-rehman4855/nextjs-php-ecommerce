"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import feature_image from "../../../public/feature_image.jpg";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Updated to AwardSpace User Area endpoint
      const res = await fetch(
        `${BASE_URL}/user_area/api/get_home_products.php`
      );
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching home products:", error);
    }
  };

  return (
    <>
      <section className="w-full py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-4 mb-10 md:mb-0 text-left">
            <h1 className="text-4xl font-bold leading-tight">
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
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded transition duration-200"
            >
              Shop Now
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-lg shadow-xl overflow-hidden">
              <Image
                src={feature_image}
                alt="Featured Product"
                width={800}
                height={500}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div>
        {/* Hero Banner */}
        <div className="bg-yellow-400 text-center p-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Our Store!
          </h1>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Best Products, Best Prices
          </p>
        </div>

        {/* Products Section */}
        <div id="products-section" className="p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Latest Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.product_id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Updated to AwardSpace Admin Images Directory */}
                  <img
                    src={`${BASE_URL}/admin_area/admin_images/${prod.product_image1}`}
                    alt={prod.product_title}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x200";
                    }}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 text-left">
                    {prod.product_title}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2 text-left">
                    Rs. {prod.product_price}
                  </p>
                </div>

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