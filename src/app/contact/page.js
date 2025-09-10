"use client";

import { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

// Create MUI Alert component
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "smttraders0@gmail.com",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success | error

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send JSON directly
      const response = await axios.post("/api/contact", formData);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      if (response.status === 200) {
        setSnackbarMessage("Message sent successfully!");
        setSnackbarSeverity("success");
        setOpen(true);
        setFormData({ name: "", email: "smttraders@gmail.com", message: "" });
      }
    } catch (err) {
      console.error("API error:", err);
      setSnackbarMessage("Failed to send message.");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-400 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-400 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-400 text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map + Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.4223038571317!2d77.81219247450306!3d9.471947381899222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf9a527da4b3%3A0x9e2ee80a03d0de10!2sCgst%20office!5e0!3m2!1sen!2sin!4v1757429393476!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen   // ✅ React uses capital S
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"   // ✅ React uses camelCase
          />

          {/* Contact Info */}
          <div className="mt-6 space-y-3 text-gray-700">
            <p className="flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              <a href="tel:+919080247608" className="hover:underline">+91 9080247608</a>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <a href="mailto:smttraders0@gmail.com" className="hover:underline">support@smttraders0@gmail.com</a>
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>1/6/R Keela Thiruthangal Road, Sivakasi-626189, Tamil Nadu</span>
            </p>
            {/* <p className="flex items-center gap-2">🌐 
              <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
            </p> */}
            <p className="flex items-center gap-2">🌐
              <a
                href="https://youtube.com/@smttraders-w6s?si=HAkw-vWlgUd1HaER"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                YouTube
              </a>
            </p>

            <p className="flex items-center gap-2">🌐
              <a href="https://www.instagram.com/invites/contact/?igsh-14bq5cnqba572&utm_content=z81v8kr" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
            </p>
            <p className="flex items-center gap-2">🌐
              <a href="https://x.com/smt_traders?s=21" target="_blank" rel="noreferrer" className="hover:underline">x</a>
            </p>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
