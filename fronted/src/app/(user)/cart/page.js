"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const { isLoggedIn, userId, fetchCartCount } = useAuth();
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   } else {
  //     fetchCartItems();
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    fetchCartItems();
  });
  const fetchCartItems = async () => {
    try {
      const res = await fetch(
        `http://localhost/ecommerce-nextjs/user_area/api/get_cart_items.php?user_id=${userId}`
      );
      const data = await res.json();
      if (data.length) {
        setItems(data);
        setMsg(""); // clear old messages
      } else {
        setItems([]);
        setMsg("Your cart is empty.");
      }
    } catch (err) {
      setMsg("Failed to fetch cart items.");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await fetch(
        `http://localhost/ecommerce-nextjs/user_area/api/remove_cart_item.php?id=${itemId}`
      );
      const data = await res.json();
      if (data.status === "success") {
        fetchCartItems();
        fetchCartCount(userId);
      }
    } catch {
      alert("Failed to remove item");
    }
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch(
        "http://localhost/ecommerce-nextjs/user_area/api/update_cart_quantity.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: itemId, quantity: newQty }),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        fetchCartItems();
        fetchCartCount(userId);
      }
    } catch {
      alert("Failed to update quantity");
    }
  };

  const getTotal = () => {
    return items.reduce(
      (acc, item) => acc + item.product_price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h2>

      {msg && <p className="text-center text-red-500">{msg}</p>}

      {items.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {items.map((item) => (
            <div
              key={item.cart_id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-4"
            >
              {/* Left Side: Image + Details */}
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost/ecommerce-nextjs/admin_area/product_images/${item.product_image}`}
                  alt={item.product_title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.product_title}
                  </h3>
                  <p className="text-green-600 font-bold">
                    Rs. {item.product_price}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.cart_id, Number(item.quantity) - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.cart_id, Number(item.quantity) + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Remove Button */}
              <div className="flex sm:block justify-end">
                <button
                  onClick={() => handleRemove(item.cart_id)}
                  className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded w-full sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: Rs. {getTotal().toLocaleString()}
            </p>
            <Link href="/checkout">
              <button className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
      <Link href="/products">
        <button className="mt-6 px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
