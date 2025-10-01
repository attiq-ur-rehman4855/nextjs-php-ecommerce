"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/app/admin/context/AdminAuthContext";

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
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/admin/change_password.php",
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
      alert(data.message || "Something went wrong.");

      if (data.message === "Password updated successfully.") {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    } catch (error) {
      alert("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-lg w-full bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-6">Change Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter old password"
              required
            />
          </div>

          <div>
            <label className="block font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
