"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://shop-sphere.infinityfreeapp.com/api/admin/get_order_details.php?order_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrder(data.order);
          setItems(data.items);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const markDelivered = () => {
    fetch(
      "https://shop-sphere.infinityfreeapp.com/api/admin/update_order_status.php",
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
          setOrder({ ...order, order_status: "Delivered" });
        }
      })
      .catch((err) => console.error(err));
  };

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">Order #{order.id} Details</h1>

      {/* Customer Info */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
        <div className="grid sm:grid-cols-1 gap-2 text-sm sm:text-base">
          <p>
            <strong>Name:</strong> {order.fullname}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
          <p className="capitalize">
            <strong>Status:</strong> {order.order_status}
          </p>
        </div>

        {order.order_status?.toLowerCase() === "pending" && (
          <button
            onClick={markDelivered}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Mark as Delivered
          </button>
        )}
      </div>

      {/* Order Items */}
      <h2 className="text-xl font-bold mt-6 mb-2">Order Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 min-w-[500px]">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="p-2 border text-left">Product Name</th>
              <th className="p-2 border text-left">Price</th>
              <th className="p-2 border text-left">Quantity</th>
              <th className="p-2 border text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="text-sm sm:text-base">
                  <td className="p-2 border">{item.product_name}</td>
                  <td className="p-2 border">Rs. {item.price}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">Rs. {item.subtotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
