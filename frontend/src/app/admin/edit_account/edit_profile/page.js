"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function EditProfile() {
  const { adminId, updateAdmin } = useAdminAuth(); // context se updateAdmin bhi le rahe hain
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (adminId) {
      // Updated to AwardSpace Admin Area Endpoint
      fetch(
        `${BASE_URL}/admin_area/api/get_admin_profile.php?admin_id=${adminId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setFormData({
              name: data.data.name || "",
              email: data.data.email || "",
              phone: data.data.phone || "",
              image: null,
            });
            
            if (data.data.image) {
              // Updated to AwardSpace Admin Images Directory
              setPreview(`${BASE_URL}/admin_area/admin_images/${data.data.image}`);
            }
          }
        })
        .catch((err) => console.error("Error fetching admin profile:", err));
    }
  }, [adminId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminId) {
      alert("Admin ID missing. Please login again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("admin_id", adminId);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Updated to AwardSpace Admin Area Endpoint
    fetch(
      `${BASE_URL}/admin_area/api/update_admin_profile.php`,
      {
        method: "POST",
        body: formDataToSend,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Profile updated response received.");
        if (data.status === "success") {
          // ✅ Update context so dashboard shows new name immediately
          updateAdmin(formData.name);

          // Clear states safely
          setFormData({ name: "", email: "", phone: "", image: null });
          setPreview(null);

          // Smooth Redirect
          router.push("/admin");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Error updating profile.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-2 rounded text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border border-gray-200 shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/150x150?text=Admin";
                  }}
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}