import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
  await connectDB();
  const cookiesHeader = req.headers.get("cookie") || "";
  const cookiesObj = cookie.parse(cookiesHeader);

  const refreshToken = cookiesObj.refreshToken;
  if (!refreshToken) return NextResponse.json({ message: "No refresh token" }, { status: 401 });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Issue new access token
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken, role: user.role });
  } catch (error) {
    return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
  }
}
