"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Updated to AwardSpace Admin Area Endpoint
    fetch(`${BASE_URL}/admin_area/api/get_orders.php`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Orders...</p>
        </div>
      </div>
    );
  }

  // Helper utility function for dynamic status styles
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered" || s === "success") return "bg-green-100 text-green-800";
    if (s === "pending" || s === "processing") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 sm:p-6 rounded-lg shadow-md text-left">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600">All Orders</h1>

        {/* ✅ Table for medium+ screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse bg-white text-sm text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-900 border-b">Order ID</th>
                <th className="p-3 font-semibold text-gray-900 border-b">User ID</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Amount</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Payment Method</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Status</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="p-3 font-medium text-gray-900">#{order.id}</td>
                    <td className="p-3 text-gray-600">{order.user_id}</td>
                    <td className="p-3 font-semibold text-gray-900">Rs. {order.total_amount}</td>
                    <td className="p-3 text-gray-600">{order.payment_method}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/admin/order-details/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500 italic">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Card view for small screens */}
        <div className="space-y-4 md:hidden">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-sm rounded-lg p-5 border border-gray-200 space-y-2 text-sm text-gray-600"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <p className="font-bold text-gray-900">Order ID: #{order.id}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusStyle(order.order_status)}`}>
                    {order.order_status}
                  </span>
                </div>
                <p><strong className="text-gray-700">User ID:</strong> {order.user_id}</p>
                <p><strong className="text-gray-700">Amount:</strong> <span className="text-gray-900 font-semibold">Rs. {order.total_amount}</span></p>
                <p><strong className="text-gray-700">Payment:</strong> {order.payment_method}</p>
                <div className="pt-2 border-t flex justify-end">
                  <Link
                    href={`/admin/order-details/${order.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-6 text-gray-500 italic bg-white rounded-lg border">
              No orders found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}