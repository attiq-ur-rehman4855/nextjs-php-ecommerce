"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      alert(msg);
      setMsg("");
    }
  }, [msg]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });

      if (name === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!pattern.test(value) ? "Please enter a valid email address." : "");
      }

      if (name === "phone") {
        const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;
        setPhoneError(!phonePattern.test(value) ? "Please enter a valid phone number." : "");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || phoneError) {
      alert("Fix the errors before submitting.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.image) formData.append("image", form.image);

    try {
      // Updated to AwardSpace Admin API endpoint
      const res = await fetch(`${BASE_URL}/admin_area/api/admin_signup.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        router.push("/admin/login");
      }
    } catch (error) {
      setMsg("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 outline-none" required />

          <input type="email" name="email" placeholder="Email" onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none ${emailError ? "border-red-500" : "border-gray-300"}`} required />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none ${phoneError ? "border-red-500" : "border-gray-300"}`} required />
          {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}

          <label className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:border-indigo-600 transition">
            <span className="flex-1 truncate text-gray-500">{form.image ? form.image.name : "Upload your image"}</span>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" required />
          </label>

          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 outline-none" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 outline-none" required />

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition disabled:opacity-50">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-indigo-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}