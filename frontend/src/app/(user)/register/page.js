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
  const [msg, setMsg] = useState(""); // message from backend (success/failure)

  useEffect(() => {
    if (msg) {
      alert(msg);
      setMsg(""); // Clear the message after showing alert
    }
  }, [msg]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files && files[0]) {
        setForm({ ...form, image: files[0] });
      }
    } else {
      setForm({ ...form, [name]: value });

      // Email validation
      if (name === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value)) {
          setEmailError("Please enter a valid email address.");
        } else {
          setEmailError("");
        }
      }

      // Phone validation (allow +, space, -, ())
      if (name === "phone") {
        const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;
        if (!phonePattern.test(value)) {
          setPhoneError("Please enter a valid phone number.");
        } else {
          setPhoneError("");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || phoneError) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      // Updated to AwardSpace Endpoint structure
      const res = await fetch(
        `${BASE_URL}/user_area/api/signup.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      
      if (data.status === "success") {
        router.push("/login");
      }
    } catch (error) {
      setMsg("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g., +923001234567"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition duration-200 mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}