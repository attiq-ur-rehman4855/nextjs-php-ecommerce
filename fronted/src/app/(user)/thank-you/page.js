"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Prevent user from coming back here via back button
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
          router.push("/");
        };
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <svg
          className="w-20 h-20 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <Link
          href="/products"
        //   className="bg-yellow-400 text-black px-3 py-1 rounded-r-md hover:bg-yellow-300"
          className="inline-block bg-yellow-400  hover:bg-yellow-300 text-black  font-semibold py-2 px-4 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
