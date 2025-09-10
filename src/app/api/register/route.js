import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  connectDB  from "../../../lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const { name, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user", // default user
  });

  return NextResponse.json({
    message: "User created successfully",
    user: { name: user.name, email: user.email, role: user.role },
  });
}
