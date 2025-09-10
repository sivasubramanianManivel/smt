import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function PATCH(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { userId, name, role } = await req.json();
  if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  if (name) user.name = name;
  if (role) user.role = role;

  await user.save();
  return NextResponse.json({ message: "User updated", user });
}
