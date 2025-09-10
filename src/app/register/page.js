"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! You can now login.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-black">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-2xl w-96 space-y-4"
  >
    <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
      Register
    </h2>

    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
    {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}

    {/* Full Name */}
    <div className="flex items-center border rounded-lg mb-4 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
      <span className="px-3 text-gray-500">
        <i className="fas fa-user"></i>
      </span>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 bg-transparent outline-none text-gray-700"
      />
    </div>

    {/* Email */}
    <div className="flex items-center border rounded-lg mb-4 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
      <span className="px-3 text-gray-500">
        <i className="fas fa-envelope"></i>
      </span>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 bg-transparent outline-none text-gray-700"
      />
    </div>

    {/* Password */}
    <div className="flex items-center border rounded-lg mb-6 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
      <span className="px-3 text-gray-500">
        <i className="fas fa-lock"></i>
      </span>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 bg-transparent outline-none text-gray-700"
      />
    </div>

    {/* Register Button */}
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
    >
      <i className="fas fa-user-plus mr-2"></i> Register
    </button>
  </form>
</div>

  );
}
