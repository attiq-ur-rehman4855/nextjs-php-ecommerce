"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/app/(user)/context/authContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, cartCount, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout(); // Clear session + context
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-yellow-400"
          >
            ShopSphere
          </Link>

          {/* Nav Links */}
          <div className="flex gap-6 items-center">
            <Link href="/" className="hover:text-yellow-400">
              Home
            </Link>
            <Link href="/products" className="hover:text-yellow-400">
              Products
            </Link>
            <Link href="/profile" className="hover:text-yellow-400">
              User Profile
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-yellow-400">
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:text-yellow-400">
                Login
              </Link>
            )}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount >= 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search Bar */}
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-l-md text-black focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-yellow-400  hover:bg-yellow-300 text-black px-3 py-1 rounded-r-md"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide text-yellow-400"
            >
              ShopSphere
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="text-white text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>

          {open && (
            <div className="mt-4 flex flex-col gap-4">
              <Link href="/" className="hover:text-yellow-400">
                Home
              </Link>
              <Link href="/products" className="hover:text-yellow-400">
                Products
              </Link>
              <Link href="/profile" className="hover:text-yellow-400">
                User Profile
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 text-left"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="hover:text-yellow-400">
                  Login
                </Link>
              )}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount >= 0 && (
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <form className="flex mt-2" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1 rounded-l-md text-black bg-white w-full"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-3 py-1 rounded-r-md hover:bg-yellow-300"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
