"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import Link from "next/link";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("info");
  const { logout, isLoggedIn, isAuthChecking } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [showEditForm, setShowEditForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("user_id");
    if (!id) return;
    
    // Updated to AwardSpace Endpoint
    fetch(`${BASE_URL}/user_area/api/get_user.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          image: null,
        });
        setPreviewImage(
          `${BASE_URL}/user_area/user_images/${data.image}`
        );
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (activeTab === "orders" && userId) {
      setLoadingOrders(true);
      // Updated to AwardSpace Endpoint
      fetch(`${BASE_URL}/user_area/api/get_user_orders.php?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoadingOrders(false);
        })
        .catch(() => setLoadingOrders(false));
    }
  }, [activeTab]);

  const toggleOrderDetails = async (orderId) => {
    if (orderDetails[orderId]) {
      const updated = { ...orderDetails };
      delete updated[orderId];
      setOrderDetails(updated);
    } else {
      // Updated to AwardSpace Endpoint
      const res = await fetch(
        `${BASE_URL}/user_area/api/get_order_details.php?order_id=${orderId}`
      );
      const data = await res.json();
      setOrderDetails((prev) => ({ ...prev, [orderId]: data }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const user_id = sessionStorage.getItem("user_id");
    const form = new FormData();
    form.append("user_id", user_id);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      // Updated to AwardSpace Endpoint
      const res = await fetch(
        `${BASE_URL}/user_area/api/update_profile.php`,
        {
          method: "POST",
          body: form,
        }
      );

      const result = await res.json();
      if (result.status === "success") {
        alert("✅ Profile updated successfully.");
        setUserData((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          image: formData.image ? formData.image.name : prev.image,
        }));

        if (formData.image) {
          setPreviewImage(URL.createObjectURL(formData.image));
        }

        setShowEditForm(false);
      } else {
        alert("❌ " + result.message);
      }
    } catch (err) {
      alert("❌ Error updating profile.");
      console.error(err);
    }
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const userId = sessionStorage.getItem("user_id");
    try {
      // Updated to AwardSpace Endpoint
      const res = await fetch(
        `${BASE_URL}/user_area/api/change_password.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        alert("✅ Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Error changing password.");
      console.error(err);
    }
  };

  if (isAuthChecking)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
    );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mb-6">
            You must be logged in to view your profile.
          </p>
          <Link href="/login">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded">
              🔐 Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="bg-gray-800 text-white w-full md:w-1/3 lg:w-1/4 p-4 md:min-h-screen text-left">
            <h2 className="text-xl font-bold mb-4">My Account</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                    activeTab === "info" && "bg-gray-700"
                  }`}
                >
                  👤 User Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                    activeTab === "orders" && "bg-gray-700"
                  }`}
                >
                  📦 Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                    activeTab === "password" && "bg-gray-700"
                  }`}
                >
                  🔒 Change Password
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left p-2 rounded hover:bg-red-600 bg-red-500 mt-4"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Main content */}
          <div className="w-full md:w-2/3 lg:w-3/4 p-6 sm:p-8 text-left">
            {activeTab === "info" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">User Information</h3>
                <div className="space-y-2">
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover mb-4 border"
                    onError={(e) => {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
                    }}
                  />
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone || "Not Provided"}
                  </p>
                </div>
                <button
                  onClick={() => setShowEditForm(!showEditForm)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ✏️ {showEditForm ? "Cancel Editing" : "Edit Account"}
                </button>

                {showEditForm && (
                  <form
                    onSubmit={handleProfileUpdate}
                    className="mt-6 space-y-4 max-w-md"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      💾 Save Changes
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Order History</h3>
                {loadingOrders ? (
                  <p>Loading orders...</p>
                ) : !orders || orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border p-4 rounded shadow-sm bg-gray-50"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="text-sm space-y-1">
                            <p>
                              <strong>Order ID:</strong> #{order.id}
                            </p>
                            <p className="capitalize">
                              <strong>Status:</strong>{" "}
                              <span className={order.order_status === "delivered" ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                                {order.order_status}
                              </span>
                            </p>
                            <p>
                              <strong>Total:</strong> Rs. {order.total_amount}
                            </p>
                            <p>
                              <strong>Payment:</strong> {order.payment_method}
                            </p>
                            <p>
                              <strong>Date:</strong> {order.created_at}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => toggleOrderDetails(order.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs sm:text-sm"
                            >
                              {orderDetails[order.id] ? "Hide Details" : "View Details"}
                            </button>
                          </div>
                        </div>

                        {orderDetails[order.id] && (
                          <div className="mt-4 border-t pt-3 space-y-2 text-sm overflow-x-auto">
                            <table className="w-full text-left min-w-[400px]">
                              <thead>
                                <tr className="font-semibold border-b pb-2">
                                  <th className="py-1">Product</th>
                                  <th className="py-1">Price</th>
                                  <th className="py-1">Qty</th>
                                  <th className="py-1">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderDetails[order.id].map((item) => (
                                  <tr key={item.id} className="border-b py-1">
                                    <td className="py-2">{item.product_name}</td>
                                    <td className="py-2">Rs. {item.price}</td>
                                    <td className="py-2">{item.quantity}</td>
                                    <td className="py-2">Rs. {item.subtotal}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "password" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-4 max-w-md"
                >
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full p-2 border rounded"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 border rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    🔁 Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}