import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import  connectDB  from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, role = "user" } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
