"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://shop-sphere.infinityfreeapp.com/api/admin/get_orders.php")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {/* ✅ Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Payment Method</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-2 border">#{order.id}</td>
                  <td className="p-2 border">{order.user_id}</td>
                  <td className="p-2 border">Rs. {order.total_amount}</td>
                  <td className="p-2 border">{order.payment_method}</td>
                  <td className="p-2 border capitalize">{order.order_status}</td>
                  <td className="p-2 border">
                    <Link
                      href={`/admin/order-details/${order.id}`}
                      className="text-blue-600 underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-3">
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
              className="bg-white shadow rounded p-4 border"
            >
              <p className="font-semibold">Order ID: #{order.id}</p>
              <p>User ID: {order.user_id}</p>
              <p>Amount: Rs. {order.total_amount}</p>
              <p>Payment: {order.payment_method}</p>
              <p>Status: <span className="capitalize">{order.order_status}</span></p>
              <Link
                href={`/admin/order-details/${order.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center p-3">No orders found</p>
        )}
      </div>
    </div>
  );
}
