"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        if (!pattern.test(value)) {
          setEmailError("Please enter a valid email address.");
        } else {
          setEmailError("");
        }
      }

      if (name === "phone") {
        const phonePattern = /^\+?[0-9\s\-()]{7,20}$/; // allow +, space, -, ()
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
      alert("Fix the errors before submitting.");
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
    formData.append("image", form.image);

    try {
      const res = await fetch(
        "https://shop-sphere.infinityfreeapp.com/api/admin/admin_signup.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setMsg(data.message);
      if (data.status === "success") {
        setTimeout(() => {
          router.push("/admin/login");
        }, 1000);
      }
    } catch (error) {
      setMsg("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-600"
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-600"
            required
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

          {/* Custom file upload field */}
          <label className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer text-gray-500 hover:border-indigo-600">
            <span className="flex-1">
              {form.image ? form.image.name : "Upload your image"}
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              required
            />
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-600"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
