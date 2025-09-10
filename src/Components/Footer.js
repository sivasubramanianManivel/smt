
"use client";
import { usePathname } from "next/navigation";

import React from 'react';

const Footer = () => {
  const pathname = usePathname(); // ✅ App Router way

  if(pathname === '/login' || '/register')return null;

  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">About Us</h2>
            <p className="text-sm">
              We are passionate about delivering quality products and services to our customers.
              Our mission is to bring value and innovation while keeping customer satisfaction first.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Shop Location */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Our Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4876!2d78.1460!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5dfg34%3A0xabc123456789!2sYour+Shop+Name!5e0!3m2!1sen!2sin!4v0000000000000"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} SMT TRADERS. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
