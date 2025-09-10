"use client";
import React, { useState } from "react";

const AdminAddProduct = ({ onAdded }) => {
  const [form, setForm] = useState({ category: "", name: "", content: "1 Box", rate: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rate: Number(form.rate) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");

      setMessage("Product added successfully!");
      setForm({ category: "", name: "", content: "1 Box", rate: "" });
      if (onAdded) onAdded();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-pink-100 p-6 rounded-xl shadow-md max-w-md mx-auto mb-6 text-black"
    >
      <h3 className="text-xl font-bold mb-4 text-pink-700 text-center">Add New Product</h3>

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-3 mb-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-3 mb-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full p-3 mb-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        name="rate"
        type="number"
        value={form.rate}
        onChange={handleChange}
        placeholder="Rate"
        className="w-full p-3 mb-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
        Add Product
      </button>

      {message && (
        <p className="mt-3 text-center font-medium text-green-700">{message}</p>
      )}
    </form>
  );
};

export default AdminAddProduct;
