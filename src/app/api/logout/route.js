import { cookies } from "next/headers";

export async function POST() {
  // Clear the token cookie
  cookies().set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // immediately expire
    path: "/",
  });

  return new Response(
    JSON.stringify({ success: true, message: "Logged out successfully" }),
    { status: 200 }
  );
}
