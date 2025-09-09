"use client";
import { useEffect, useState } from "react";
import { useAdminAuth } from "./context/AdminAuthContext";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [adminImage, setAdminImage] = useState(null);
  const { admin, adminId } = useAdminAuth(); // Ensure adminId is coming from context

  useEffect(() => {
    const fetchData = async () => {
      // Fetch dashboard stats
      const statsRes = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/get_dashboard_stats.php"
      );
      const stats = await statsRes.json();
      setDashboardData(stats);

      // Fetch recent orders
      const ordersRes = await fetch(
        "http://localhost/ecommerce-nextjs/admin_area/api/get_recent_orders.php"
      );
      const orders = await ordersRes.json();
      setRecentOrders(orders);

      // Fetch admin image
      if (adminId) {
        const profileRes = await fetch(
          `http://localhost/ecommerce-nextjs/admin_area/api/get_admin_profile.php?admin_id=${adminId}`
        );
        const profileData = await profileRes.json();
        if (profileData.status === "success") {
          setAdminImage(
            `http://localhost/ecommerce-nextjs/admin_area/admin_images/${profileData.data.image}`
          );
        }
      }
    };

    fetchData();
    if (!adminId) {
      setAdminImage(null);
    }
  }, [adminId]);

  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
        <div className="w-12 h-12 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-medium">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Top Section with Name + Image */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 flex items-center gap-3">
          {adminImage && (
            <img
              src={adminImage}
              alt="Admin"
              className="w-12 h-12 rounded-full border-2 border-indigo-300 object-cover"
            />
          )}
          Welcome, {admin ? admin : "Admin"}!
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 border border-indigo-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Products</h2>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
            {dashboardData.totalProducts}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-blue-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Categories</h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {dashboardData.totalCategories}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-purple-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Brands</h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">
            {dashboardData.totalBrands}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-yellow-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Orders</h2>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
            {dashboardData.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-green-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Customers</h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {dashboardData.totalCustomers}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-pink-200">
          <h2 className="text-gray-600 text-sm mb-2">Total Earnings</h2>
          <p className="text-2xl sm:text-3xl font-bold text-pink-600 break-words truncate">
            Rs. {dashboardData.totalEarnings}
          </p>
        </div>
      </div>

      {/* Recent Orders Table - responsive scroll */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-600">
          Recent Orders
        </h2>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border">#{order.id}</td>
                <td className="p-2 border">{order.user_id}</td>
                <td className="p-2 border">Rs. {order.total_amount}</td>
                <td
                  className={`p-2 border font-medium ${
                    order.order_status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order.order_status.charAt(0).toUpperCase() +
                    order.order_status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
