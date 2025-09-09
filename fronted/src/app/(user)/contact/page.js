"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  const { userName, userEmail, isLoggedIn } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setForm((prev) => ({
        ...prev,
        name: userName || "",
        email: userEmail || "",
      }));
    } else {
      // agar login nahi hai to fields khali kar do
      setForm({ name: "", email: "", message: "" });
    }
  }, [isLoggedIn, userName, userEmail]);

  // Auto clear message after 1 second
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Check login first
    if (!isLoggedIn) {
      alert("You must be logged in to send a message.");
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setMsg("All fields are required");
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost/ecommerce-nextjs/user_area/api/save_message.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(data.message);

      if (data.status === "success") {
        alert("Message sent successfully!");
        setForm({ name: userName || "", email: userEmail || "", message: "" });
      } else {
        alert("Failed to send message!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Error connecting to server");
      alert("Error connecting to server!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We’re here to help. Reach out to us anytime.
          </p>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-2"><Mail className="text-yellow-500" /> support@shopsphere.com</p>
            <p className="flex items-center gap-2"><Phone className="text-yellow-500" /> +1 (555) 123-4567</p>
            <p className="flex items-center gap-2"><MapPin className="text-yellow-500" /> 123 Market Street, New York, USA</p>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2 text-yellow-500">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-500"><Facebook /></a>
            <a href="#" className="hover:text-yellow-500"><Twitter /></a>
            <a href="#" className="hover:text-yellow-500"><Instagram /></a>
            <a href="#" className="hover:text-yellow-500"><Youtube /></a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-yellow-400"
              required
              disabled={!isLoggedIn}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-yellow-400"
              required
              disabled={!isLoggedIn}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-yellow-400"
              required
              disabled={!isLoggedIn}
            ></textarea>
            <button
              type="submit"
              className={`w-full text-black font-semibold py-2 rounded ${
                isLoggedIn
                  ? "bg-yellow-400 hover:bg-yellow-300"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isLoggedIn}
            >
              {isLoggedIn ? "Send Message" : "Login to Contact"}
            </button>
          </form>

          {msg && (
            <p className="mt-4 text-center text-green-600 font-medium">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
