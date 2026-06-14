"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Updated to AwardSpace Admin Area Endpoint
    fetch(
      `${BASE_URL}/admin_area/api/get_order_details.php?order_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrder(data.order);
          setItems(data.items || []);
        } else {
          alert(data.message || "Failed to load order details.");
        }
      })
      .catch((err) => console.error("Error fetching order details:", err));
  }, [id]);

  const markDelivered = () => {
    if (updating) return;
    setUpdating(true);

    // Updated to AwardSpace Admin Area Endpoint
    fetch(
      `${BASE_URL}/admin_area/api/update_order_status.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: id, status: "Delivered" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Order marked as Delivered!");
          setOrder((prev) => ({ ...prev, order_status: "Delivered" }));
        } else {
          alert(data.message || "Failed to update status.");
        }
      })
      .catch((err) => console.error("Error updating order status:", err))
      .finally(() => setUpdating(false));
  };

  if (!order) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Order Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md text-left">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600">Order #{order.id} Details</h1>

        {/* Customer Info */}
        <div className="mb-6 border border-gray-200 p-4 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">Customer Info</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-600"><strong>Name:</strong> <span className="text-gray-900 font-medium">{order.fullname}</span></p>
              <p className="text-gray-600 mt-1"><strong>Email:</strong> <span className="text-gray-900">{order.email}</span></p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Phone:</strong> <span className="text-gray-900">{order.phone}</span></p>
              <p className="text-gray-600 mt-1 capitalize flex items-center gap-2">
                <strong>Status:</strong> 
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  order.order_status?.toLowerCase() === "pending" 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {order.order_status}
                </span>
              </p>
            </div>
          </div>

          {order.order_status?.toLowerCase() === "pending" && (
            <button
              onClick={markDelivered}
              disabled={updating}
              className="mt-5 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-md w-full sm:w-auto transition duration-200 shadow-sm disabled:opacity-50"
            >
              {updating ? "Updating..." : "Mark as Delivered"}
            </button>
          )}
        </div>

        {/* Order Items */}
        <h2 className="text-xl font-bold mt-8 mb-3 text-gray-800">Order Items</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-900 border-b">Product Name</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Price</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Quantity</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition duration-150 text-gray-700">
                    <td className="p-3 font-medium text-gray-900">{item.product_name}</td>
                    <td className="p-3">Rs. {item.price}</td>
                    <td className="p-3 font-medium">{item.quantity}</td>
                    <td className="p-3 font-semibold text-gray-900">Rs. {item.subtotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500 italic">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}