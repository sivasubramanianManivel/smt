import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectDB();
    return NextResponse.json({ message: "MongoDB connected successfully!" });
  } catch (err) {
    return NextResponse.json({ message: "MongoDB connection failed", error: err.message });
  }
}
