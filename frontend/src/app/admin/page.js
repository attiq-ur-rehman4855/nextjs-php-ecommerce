"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "./context/AdminAuthContext";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [adminImage, setAdminImage] = useState(null);
  const { admin, adminId } = useAdminAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const statsRes = await fetch(`${BASE_URL}/admin_area/api/get_dashboard_stats.php`);
        const stats = await statsRes.json();
        setDashboardData(stats);

        // Fetch recent orders
        const ordersRes = await fetch(`${BASE_URL}/admin_area/api/get_recent_orders.php`);
        const orders = await ordersRes.json();
        setRecentOrders(Array.isArray(orders) ? orders : []);

        // Fetch admin image
        if (adminId) {
          const profileRes = await fetch(`${BASE_URL}/admin_area/api/get_admin_profile.php?admin_id=${adminId}`);
          const profileData = await profileRes.json();
          if (profileData.status === "success" && profileData.data?.image) {
            setAdminImage(`${BASE_URL}/admin_area/admin_images/${profileData.data.image}`);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
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
        {[
          { title: "Total Products", value: dashboardData.totalProducts, color: "indigo" },
          { title: "Total Categories", value: dashboardData.totalCategories, color: "blue" },
          { title: "Total Brands", value: dashboardData.totalBrands, color: "purple" },
          { title: "Total Orders", value: dashboardData.totalOrders, color: "yellow" },
          { title: "Total Customers", value: dashboardData.totalCustomers, color: "green" },
          { title: "Total Earnings", value: `Rs. ${dashboardData.totalEarnings}`, color: "pink" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
            <h2 className="text-gray-600 text-sm mb-2">{item.title}</h2>
            <p className={`text-xl sm:text-2xl font-bold text-${item.color}-600 truncate`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">Recent Orders</h2>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border-b">Order ID</th>
              <th className="p-3 border-b">User ID</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 border-b">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.user_id}</td>
                <td className="p-3">Rs. {order.total_amount}</td>
                <td className={`p-3 font-medium ${order.order_status?.toLowerCase() === "pending" ? "text-yellow-600" : "text-green-600"}`}>
                  {order.order_status?.charAt(0).toUpperCase() + order.order_status?.slice(1)}
                </td>
              </tr>
            )) : <tr><td colSpan="4" className="p-4 text-center">No recent orders.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}