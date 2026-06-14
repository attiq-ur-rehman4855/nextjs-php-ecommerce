"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/app/admin/context/AdminAuthContext";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function ChangePassword() {
  const { adminId } = useAdminAuth();
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (!adminId) {
      alert("Admin ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Updated to AwardSpace Admin Area Endpoint
      const res = await fetch(
        `${BASE_URL}/admin_area/api/change_password.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: adminId,
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();
      
      // Checking for message matches or status hooks from server side
      if (data.status === "success" || data.message === "Password updated successfully.") {
        alert(data.message || "Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        router.push("/admin"); // Direct redirection
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-8 max-w-md w-full bg-white shadow-md rounded-lg text-left">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Change Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter old password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition duration-200 font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded border border-red-100">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}