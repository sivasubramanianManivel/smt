
import mongoose from "mongoose";
import emailjs from "emailjs-com";
import connectDB from "../../../lib/mongodb";
import Contact from "../../../models/Contact";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    // Save to DB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // (Optional) if you want EmailJS, do it on client side instead of here
    // EmailJS isn't great for server-side, better keep in frontend

    return new Response(
      JSON.stringify({ success: true, msg: "Message saved!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}