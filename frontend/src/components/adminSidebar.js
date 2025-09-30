"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/app/admin/context/AdminAuthContext";

export default function AdminSidebar() {
  const { admin, logout } = useAdminAuth();
  const [openMenu, setOpenMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  // ✅ sidebar close helper (mobile/tablet only)
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button (visible on small/medium only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 overflow-y-auto h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
          Admin Panel
        </h2>

        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              onClick={handleClose}
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>

          {!admin ? (
            <li>
              <Link
                href="/admin/login"
                onClick={handleClose}
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  logout();
                  handleClose();
                }}
                className="block w-full text-left text-red-400 py-2 px-4 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          )}

          {/* Products */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="w-full flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700"
            >
              Products
              {openMenu === "products" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openMenu === "products" && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/admin/products/add_product"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/products/view_products"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    View Products
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Categories */}
          <li>
            <button
              onClick={() => toggleMenu("categories")}
              className="w-full flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700"
            >
              Categories
              {openMenu === "categories" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openMenu === "categories" && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/admin/categories/add_category"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/categories/view_category"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    View Categories
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Brands */}
          <li>
            <button
              onClick={() => toggleMenu("brands")}
              className="w-full flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700"
            >
              Brands
              {openMenu === "brands" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {openMenu === "brands" && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link
                    href="/admin/brands/add_brand"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    Add Brand
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/brands/view_brand"
                    onClick={handleClose}
                    className="block py-1 px-2 rounded hover:bg-gray-700"
                  >
                    View Brands
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <Link
              href="/admin/orders"
              onClick={handleClose}
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Orders
            </Link>
          </li>

          {/* Customers */}
          <li>
            <Link
              href="/admin/customers"
              onClick={handleClose}
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Customers
            </Link>
          </li>

          {/* Edit Account */}
          {/* Edit Account (only if admin is logged in) */}
          {admin && (
            <li>
              <button
                onClick={() => toggleMenu("edit_account")}
                className="w-full flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700"
              >
                Edit Account
                {openMenu === "edit_account" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {openMenu === "edit_account" && (
                <ul className="ml-4 space-y-1">
                  <li>
                    <Link
                      href="/admin/edit_account/edit_profile"
                      onClick={handleClose}
                      className="block py-1 px-2 rounded hover:bg-gray-700"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/edit_account/change_password"
                      onClick={handleClose}
                      className="block py-1 px-2 rounded hover:bg-gray-700"
                    >
                      Change Password
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </aside>
    </>
  );
}
