"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        // Show error returned from backend
        setError(data.message || "Login failed");
        return;
      }

      // Save token in cookies/localStorage if backend sends JWT
      if (data.token) {
        document.cookie = `token=${data.token}; path=/;`;
      }

      // Role-based redirect
      if (data.role === "admin") {
        router.push('/admin')
      }
      else {
        router.push("/home");
      }



    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

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

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          <i className="fas fa-sign-in-alt mr-2"></i> Login
        </button>
      </form>
    </div>

  );
}
