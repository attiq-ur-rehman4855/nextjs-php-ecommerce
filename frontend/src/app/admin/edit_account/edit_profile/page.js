"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";

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
      fetch(
        `https://shop-sphere.infinityfreeapp.com/api/admin/get_admin_profile.php?admin_id=${adminId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setFormData({
              name: data.data.name,
              email: data.data.email,
              phone: data.data.phone,
              image: null,
            });
            setPreview(
              `https://shop-sphere.infinityfreeapp.com/api/admin/admin_images/${data.data.image}`
            );
          }
        });
    }
  }, [adminId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("admin_id", adminId);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    fetch(
      "https://shop-sphere.infinityfreeapp.com/api/admin/update_admin_profile.php",
      {
        method: "POST",
        body: formDataToSend,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.status === "success") {
          // ✅ Update context so dashboard shows new name immediately
          updateAdmin(formData.name);

          // Clear form
          setFormData({ name: "", email: "", phone: "", image: null });
          setPreview(null);

          // Redirect after 1 second
          setTimeout(() => {
            router.push("/admin");
          }, 1000);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating profile.");
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded min-h-screen flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
