"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { userId, fetchCartCount } = useAuth();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [billingDetails, setBillingDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  // Fetch cart items
  useEffect(() => {
    if (!userId) return;
    const storedName = sessionStorage.getItem("user_fullname") || "";
    const storedEmail = sessionStorage.getItem("user_email") || "";
    const storedPhone = sessionStorage.getItem("user_phone") || "";

    setBillingDetails((prev) => ({
      ...prev,
      fullname: storedName,
      email: storedEmail,
      phone: storedPhone,
    }));
    fetch(
      `https://shop-sphere.infinityfreeapp.com/api/user/get_cart_items.php?user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        const calculatedTotal = data.reduce(
          (acc, item) => acc + item.product_price * item.quantity,
          0
        );
        setTotal(calculatedTotal);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login first.");
      return;
    }

    const { fullname, email, phone, address, city, country, zip } =
      billingDetails;
    if (
      !fullname ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country ||
      !zip
    ) {
      alert("Please fill in all billing fields.");
      return;
    }

    const orderData = {
      user_id: userId,
      items: cartItems,
      total,
      payment_method: paymentMethod,
      billing: billingDetails,
    };

    if (paymentMethod === "cod") {
      if (cartItems.length === 0) {
        alert("Your cart is empty. Cannot place order.");
        return;
      }

      try {
        const res = await fetch(
          "https://shop-sphere.infinityfreeapp.com/api/user/place_order_cod.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        const result = await res.json();

        if (result.status === "success") {
          alert("✅ Order placed successfully with Cash on Delivery!");
          await fetchCartCount(userId);
          setCartItems([]);
          router.push("/thank-you");
        } else {
          alert("❌ Failed to place order. Please try again.");
        }
      } catch (err) {
        console.error("Order placement error:", err);
        alert("Something went wrong!");
      }
    } else if (paymentMethod === "online") {
      try {
        const res = await fetch("/api/create-stripe-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            billingDetails,
            cartItems,
            total,
          }),
        });

        const result = await res.json();
        if (result.sessionId) {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
          ); // Replace with real key
          await stripe.redirectToCheckout({ sessionId: result.sessionId });
        } else {
          alert("Failed to create Stripe session");
        }
      } catch (err) {
        console.error("Stripe session error:", err);
        alert("Something went wrong with Stripe payment.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Billing Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={billingDetails.fullname}
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={billingDetails.email}
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            value={billingDetails.phone}
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            className="w-full border px-4 py-2 rounded"
            onChange={handleInputChange}
          />
        </form>
      </div>

      {/* Right Side - Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <div className="mb-4 space-y-4">
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 text-left"
              >
                {/* Left Section */}
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <img
                    src={`https://shop-sphere.infinityfreeapp.com/api/admin/product_images/${item.product_image}`}
                    alt={item.product_title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.product_title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="text-left sm:text-right">
                  <p className="font-semibold">Rs. {item.product_price}</p>
                  <p className="text-sm text-gray-500">
                    Total: {item.product_price} × {item.quantity} ={" "}
                    {item.product_price * item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-lg">
          <span>SubTotal</span>
          <span>Rs. {total}</span>
        </div>

        {/* Payment Method */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              className="mr-2"
            />
            Pay Online
          </label>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
