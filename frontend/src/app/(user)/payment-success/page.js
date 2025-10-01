"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const PaymentSuccess = () => {
  const [message, setMessage] = useState("Placing your order...");
  const { fetchCartCount } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");
    const user_id = urlParams.get("user_id");
    const processed = urlParams.get("processed");

    const billing = {
      fullname: urlParams.get("fullname"),
      email: urlParams.get("email"),
      phone: urlParams.get("phone"),
      address: urlParams.get("address"),
      city: urlParams.get("city"),
      country: urlParams.get("country"),
      zip: urlParams.get("zip"),
    };

    // ✅ If already processed, just show success message
    if (processed === "true") {
      setMessage("✅ Payment successful & order placed!");
      fetchCartCount(user_id); // make sure cart shows 0
      return;
    }

    if (session_id && user_id) {
      fetch(
        "https://shop-sphere.infinityfreeapp.com/api/user/place_order_stripe.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id, user_id, billing }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setMessage("✅ Payment successful & order placed!");
            fetchCartCount(user_id); // update cart icon to 0

            // ✅ Update URL to include processed=true
            urlParams.set("processed", "true");
            window.history.replaceState(
              null,
              "",
              window.location.pathname + "?" + urlParams.toString()
            );
          } else {
            setMessage("❌ Payment was successful, but failed to place order.");
          }
        })
        .catch(() => setMessage("❌ Error connecting to backend."));
    } else {
      setMessage("Invalid request.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Payment Success
        </h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
